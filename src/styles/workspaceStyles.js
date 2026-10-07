/**
 * Workspace stylesheets — keeps the LauncherDesk site and the Portal looking exactly as
 * they did as separate apps, inside ONE React application.
 *
 * Both global stylesheets style bare elements (body, a, *, svg, h1…h6, table, input):
 *   • launcherdesk.css resets `* { margin:0; padding:0 }`, makes every svg `display:block`,
 *     restyles headings and body line-height — which distorts Portal pages;
 *   • the Portal's global.css sets the body font/background — which would restyle the site.
 * So each sheet is injected once (as <style>) and only the active workspace's sheet is
 * applied (media="all"); the other is parked with media="not all". No selector is changed,
 * so neither design is altered.
 */
import siteCss from '../assets/launcherdesk.css?inline';
import portalCss from './portal/global.css?inline';

const SHEETS = { launcherdesk: siteCss, portal: portalCss };
const elements = {};

/** Paths rendered by the original Portal UI (layouts/portal + pages/portal). */
const PORTAL_PATH = /^\/(super-admin|admin|client|unauthorized|reset-password|forgot-password)(\/|$)/;

export function workspaceForPath(pathname) {
  return PORTAL_PATH.test(pathname) ? 'portal' : 'launcherdesk';
}

function ensureSheets() {
  if (typeof document === 'undefined') return;
  for (const [name, css] of Object.entries(SHEETS)) {
    if (elements[name]) continue;
    const el = document.createElement('style');
    el.dataset.workspace = name;
    el.media = 'not all';
    el.textContent = css;
    document.head.appendChild(el);
    elements[name] = el;
  }
}

export function activateWorkspaceStyles(workspace) {
  ensureSheets();
  for (const [name, el] of Object.entries(elements)) {
    el.media = name === workspace ? 'all' : 'not all';
  }
  if (typeof document !== 'undefined') document.documentElement.dataset.workspace = workspace;
}
