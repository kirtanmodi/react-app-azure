import { exec } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ENV = "dev";
// const ENV = "prod";

const __dirname = dirname(fileURLToPath(import.meta.url));
const resourceGroupName = "test";
const location = "eastus";
const storageAccountName = `infotechtion${ENV}`;
const buildDirectoryPath = join(__dirname, "dist");

const checkUser = () => {
  return new Promise((resolve, reject) => {
    console.log("Checking user...");
    exec("az account show", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(stdout);
      if (JSON.parse(stdout).user.name.includes("modikirtan19@gmail.com")) {
        console.log("You are logged in with the correct account.");
        resolve();
      } else {
        reject("You are not logged in with the correct account.");
      }
      resolve(stdout);
    });
  });
};

const buildReactApp = () => {
  return new Promise((resolve, reject) => {
    console.log("Building React app...");
    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error during build: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Build stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

const checkStorageAccountExists = () => {
  return new Promise((resolve, reject) => {
    console.log("Checking if the Azure Storage Account exists...");
    const command = `az storage account list --resource-group ${resourceGroupName} --query "[?name=='${storageAccountName}']" --output tsv`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      resolve(stdout.trim() !== "");
    });
  });
};

const createStorageAccount = () => {
  return new Promise((resolve, reject) => {
    console.log("Creating Azure Storage Account...");
    const command = `az storage account create --name ${storageAccountName} --resource-group ${resourceGroupName} --location ${location} --kind StorageV2 --sku Standard_LRS`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

const enableStaticWebsite = () => {
  return new Promise((resolve, reject) => {
    console.log("Enabling static website hosting...");
    const command = `az storage blob service-properties update --account-name ${storageAccountName} --static-website --404-document index.html --index-document index.html`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

// const enableCORS = () => {
//   return new Promise((resolve, reject) => {
//     console.log("Enabling CORS...");
//     const command = `az storage cors add --methods GET POST PUT --origins '*' --services b --allowed-headers '*' --exposed-headers '*' --max-age 200 --account-name ${storageAccountName}`;
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error: ${error.message}`);
//         reject(error);
//         return;
//       }
//       if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         reject(stderr);
//         return;
//       }
//       console.log(stdout);
//       resolve(stdout);
//     });
//   });
// };

const uploadBuildFiles = () => {
  return new Promise((resolve, reject) => {
    console.log("Uploading build files to $web container...");
    // const command = `az storage blob upload-batch -s ${buildDirectoryPath} -d '$web' --account-name ${storageAccountName}`;
    const command = `az storage blob upload-batch -s ${buildDirectoryPath} -d '$web' --account-name ${storageAccountName} --overwrite`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(stdout);
      resolve(stdout);
    });
  });
};

const findWebsiteURL = () => {
  return new Promise((resolve, reject) => {
    console.log("Finding website URL...");
    const command = `az storage account show -n ${storageAccountName} -g ${resourceGroupName} --query "primaryEndpoints.web" --output tsv`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        reject(stderr);
        return;
      }
      console.log(`Website URL: ${stdout}`);
      resolve(stdout.trim() !== "");
    });
  });
};

checkUser().then(() => {
  buildReactApp()
    .then(checkStorageAccountExists)
    .then((exists) => {
      if (exists) {
        console.log("Storage account already exists. Skipping creation.");
        return Promise.resolve();
      } else {
        return createStorageAccount().then(() => {
          enableStaticWebsite().then(() => {
            // enableCORS();
          });
        });
      }
    })
    .then(uploadBuildFiles)
    .then(() => {
      console.log("Deployment completed successfully.");
    })
    .then(() => {
      findWebsiteURL();
    })
    .catch((error) => {
      console.error("Deployment failed:", error);
    });
});

// run this command to check the website url
// replace devtocconfigfrontend with your storage account name
// replace TOCTeamResources with your resource group name
// az storage account show -n devtocconfigfrontend -g TOCTeamResources --query "primaryEndpoints.web" --output tsv

// for cors
// az storage cors add --methods GET POST PUT --origins '*' --services b --allowed-headers '*' --exposed-headers '*' --max-age 200 --account-name devtocconfigfrontend
