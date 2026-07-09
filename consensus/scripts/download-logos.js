import fs from "fs";
import https from "https";
import path from "path";

const targetDir = "./public/icons/crypto";

const downloads = [
  { file: "sui.svg", url: "https://dl.svgcdn.com/svg/token-branded/sui.svg" },
  { file: "apt.svg", url: "https://dl.svgcdn.com/svg/token-branded/aptos.svg" },
  { file: "base.svg", url: "https://dl.svgcdn.com/svg/token-branded/base.svg" },
  { file: "op.svg", url: "https://dl.svgcdn.com/svg/token-branded/optimism.svg" },
  { file: "zk.svg", url: "https://dl.svgcdn.com/svg/token-branded/zksync.svg" },
  { file: "strk.svg", url: "https://dl.svgcdn.com/svg/token-branded/starknet.svg" },
  { file: "celo.svg", url: "https://dl.svgcdn.com/svg/token-branded/celo.svg" },
  { file: "osmo.svg", url: "https://dl.svgcdn.com/svg/token-branded/osmosis.svg" },
  { file: "icp.svg", url: "https://cryptologos.cc/logos/internet-computer-icp-logo.svg" },
  { file: "xch.svg", url: "https://cryptologos.cc/logos/chia-xch-logo.svg" },
  { file: "dcr.svg", url: "https://cryptologos.cc/logos/decred-dcr-logo.svg" },
  { file: "xem.svg", url: "https://cryptologos.cc/logos/nem-xem-logo.svg" },
  { file: "ln.svg", url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Lightning_Network.svg" },
];

function download(file, url) {
  return new Promise((resolve, reject) => {
    const dest = path.join(targetDir, file);
    
    // Delete target file if it's less than 100 bytes (failed download)
    if (fs.existsSync(dest) && fs.statSync(dest).size < 100) {
      fs.unlinkSync(dest);
    }
    
    if (fs.existsSync(dest)) {
      console.log(`  -  ${file} already exists, skipping.`);
      resolve();
      return;
    }

    const fileStream = fs.createWriteStream(dest);
    
    const requestOptions = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    };

    https.get(url, requestOptions, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        download(file, response.headers.location).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        fileStream.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(new Error(`Failed to download ${file} from ${url}: Status Code ${response.statusCode}`));
        return;
      }

      response.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        console.log(`  ✓  Downloaded ${file}`);
        resolve();
      });
    }).on("error", (err) => {
      fileStream.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

console.log("Downloading missing cryptocurrency logos...");
for (const item of downloads) {
  try {
    await download(item.file, item.url);
  } catch (err) {
    console.error(`  ✗  Error downloading ${item.file}:`, err.message);
  }
}
console.log("Done downloading logos.");
