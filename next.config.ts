import type { NextConfig } from "next";

import autoCert from "anchor-pki/auto-cert/integrations/next";

const withAutoCert = autoCert({
  enabledEnv: "development",
});

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["lh3.googleusercontent.com/", "gravatar.com"],
  },
};

export default withAutoCert(nextConfig);