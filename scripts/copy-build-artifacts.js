const fs = require("fs");
const path = require("path");

function syncDir(src, dest) {
  if (!fs.existsSync(src)) return;
  if (fs.existsSync(dest)) {
    fs.rmSync(dest, { recursive: true, force: true });
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
}

console.log("[copy-build-artifacts] Synchronizing build artifacts for production deployment...");

const rootDir = path.resolve(__dirname, "..");
const webAppDir = path.join(rootDir, "apps", "web");

// Check for .next-prod first (dedicated production build output), fallback to .next
const webNextProd = path.join(webAppDir, ".next-prod");
const webNextActual = path.join(webAppDir, ".next");
const webNext = fs.existsSync(webNextProd) ? webNextProd : webNextActual;
const rootNext = path.join(rootDir, ".next");

const webPublic = path.join(webAppDir, "public");
const rootPublic = path.join(rootDir, "public");

// 1. Copy production artifacts to root .next
if (fs.existsSync(webNext)) {
  syncDir(webNext, rootNext);
  console.log(`[copy-build-artifacts] Copied ${path.relative(rootDir, webNext)} -> .next`);
}

// 2. Keep apps/web/.next strictly dedicated for development server
// (Do not overwrite apps/web/.next with production artifacts)

// 3. Copy public to root public
if (fs.existsSync(webPublic)) {
  syncDir(webPublic, rootPublic);
  console.log("[copy-build-artifacts] Copied apps/web/public -> public");
}

// 4. Next.js standalone assets alignment (static & public)
const standaloneDir = path.join(rootNext, "standalone");
if (fs.existsSync(standaloneDir)) {
  const rootStatic = path.join(rootNext, "static");

  // Ensure root-level standalone has public and static
  if (fs.existsSync(webPublic)) {
    fs.cpSync(webPublic, path.join(standaloneDir, "public"), { recursive: true, force: true });
  }
  if (fs.existsSync(rootStatic)) {
    fs.cpSync(rootStatic, path.join(standaloneDir, ".next", "static"), { recursive: true, force: true });
  }

  // Ensure apps/web sub-directory inside standalone has public and static
  const standaloneWeb = path.join(standaloneDir, "apps", "web");
  if (fs.existsSync(standaloneWeb)) {
    if (fs.existsSync(webPublic)) {
      fs.cpSync(webPublic, path.join(standaloneWeb, "public"), { recursive: true, force: true });
    }
    if (fs.existsSync(rootStatic)) {
      fs.cpSync(rootStatic, path.join(standaloneWeb, ".next", "static"), { recursive: true, force: true });
      fs.cpSync(rootStatic, path.join(standaloneWeb, ".next-prod", "static"), { recursive: true, force: true });
      fs.cpSync(rootStatic, path.join(standaloneDir, ".next", "static"), { recursive: true, force: true });
      fs.cpSync(rootStatic, path.join(standaloneDir, ".next-prod", "static"), { recursive: true, force: true });
    }
    console.log("[copy-build-artifacts] Synchronized standalone assets");
  }

  // Create a root-level standalone server.js entry if not present
  const rootStandaloneServer = path.join(standaloneDir, "server.js");
  const webStandaloneServer = path.join(standaloneWeb, "server.js");
  if (!fs.existsSync(rootStandaloneServer) && fs.existsSync(webStandaloneServer)) {
    fs.writeFileSync(
      rootStandaloneServer,
      `// Auto-generated standalone entry\nprocess.chdir(require('path').join(__dirname, 'apps', 'web'));\nrequire('./apps/web/server.js');\n`
    );
    console.log("[copy-build-artifacts] Generated root standalone server.js trampoline");
  }
}

// 5. Keep .next-prod directory intact for symlink resolution
console.log("[copy-build-artifacts] Preserved build directories.");

console.log("[copy-build-artifacts] Artifacts synchronized successfully.");
