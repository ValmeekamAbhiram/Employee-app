// Vercel treats this file as CommonJS, so we use dynamic import()
// to load the ES Module backend server
let appPromise;

module.exports = async (req, res) => {
  if (!appPromise) {
    appPromise = import('../backend/server.js').then((mod) => mod.default);
  }
  const app = await appPromise;
  return app(req, res);
};
