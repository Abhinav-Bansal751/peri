import { isPlatform } from "@ionic/core";
import semver from "semver";

export const appVersion = "v2.4.0";

export interface GithubReleaseAsset {
  content_type: string;
  browser_download_url: string;
  // NOTE: Other fields are not significant
  //       You can see all fields with the following command:
  //       `curl https://api.github.com/repos/IraSoro/peri/releases/latest`
}

export interface GithubReleaseInfo {
  html_url: string;
  tag_name: string;
  draft: boolean;
  assets: GithubReleaseAsset[];
  // NOTE: Other fields are not significant
  //       You can see all fields with the following command:
  //       `curl https://api.github.com/repos/IraSoro/peri/releases/latest`
}

export interface LatestReleaseInfo {
  version: string;
  htmlUrl: string;
}

async function getLatestReleaseInfo(): Promise<LatestReleaseInfo> {
  const newVersionInfo = {
    version: appVersion,
    htmlUrl: "",
  } satisfies LatestReleaseInfo;

  const response = await fetch(
    "https://api.github.com/repos/IraSoro/peri/releases/latest",
  );

  const githubReleaseInfo = (await response.json()) as GithubReleaseInfo;

  const apkUrls = githubReleaseInfo.assets.filter((asset) => {
    return asset.content_type === "application/vnd.android.package-archive";
  });

  if (!apkUrls.length) {
    throw new Error("Can't find apk files in assets list");
  }

  newVersionInfo.version = githubReleaseInfo.tag_name;
  newVersionInfo.htmlUrl = githubReleaseInfo.html_url;

  return newVersionInfo;
}

export async function isNewVersionAvailable(): Promise<boolean> {
  if (
    isPlatform("desktop") ||
    isPlatform("mobileweb") ||
    !isPlatform("android")
  ) {
    return false;
  }

  return semver.gt((await getLatestReleaseInfo()).version, appVersion);
}

export async function downloadLatestRelease() {
  const latestRelease = await getLatestReleaseInfo();
  window.open(latestRelease.htmlUrl, "_system", "location=yes");
}
