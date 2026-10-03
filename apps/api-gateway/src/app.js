import express from "express";
import {createProxyMiddleware} from 'http-proxy-middleware';

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "api-gateway",
  });
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "",
    },
  })
);

export default app;