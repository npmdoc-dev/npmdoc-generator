import { request } from 'gaxios';

interface PackageMetadata {
  latest: string;
}

/**
 * Get the latest tag for a given npm module
 * @param {string} package name of the package
 * @returns The semver version with the latest tag
 */
export async function getLatest(packageName: string) {
  if (!packageName) {
    throw new Error('Package is required.');
  }
  const url = `http://registry.npmjs.org/-/package/${packageName}/dist-tags`;
  const packageRes = await request<PackageMetadata>({ url });
  const latest = packageRes.data.latest;
  return latest;
}

/**
 * Parse a path and return the package name and version
 * @param {string} path The path portion of the url to parse
 */
export function extractFromRoute(path: string) {
  const parts = path
    .split('/')
    .filter(x => x.length)
    .slice(1);
  let name;
  let version;
  if (parts[0].startsWith('@')) {
    switch (parts.length) {
      case 2:
        name = parts.join('/');
        break;
      case 3:
        name = parts.slice(0, 2).join('/');
        version = parts[2];
        break;
      default:
        throw new Error(`Malformed url: ${path}`);
    }
  } else {
    switch (parts.length) {
      case 1:
        name = parts[0];
        break;
      case 2:
        name = parts[0];
        version = parts[1];
        break;
      default:
        throw new Error(`Malformed url: ${path}`);
    }
  }
  if (name) {
    name = name.toLowerCase();
  }
  return { name, version };
}
