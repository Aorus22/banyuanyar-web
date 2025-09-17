// OpenNext Cloudflare config - without R2 cache for now
import { defineCloudflareConfig } from "@opennextjs/cloudflare/config";

export default defineCloudflareConfig({
	// No incremental cache for now - will use default memory cache
	// You can add R2 cache later when R2 is enabled in your Cloudflare account
});
