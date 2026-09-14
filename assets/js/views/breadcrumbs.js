/* Breadcrumb trail, derived entirely from the current route so it can never
   drift out of step with the URL. Every crumb except the last is a real link,
   which means it is shareable and works with middle-click. */

import { S } from '../state.js';
import { sectionById, partById } from '../data/manifest.js';
import { UNITS } from '../data/units.js';
import { activityDef } from '../activity-defs.js';
import { hashFor } from '../router.js';

function renderBreadcrumbs(){
  const r = S.route || { view:'home' };
  if(r.view === 'home') return '';

  const crumbs = [{ label:'Home', href:'#/' }];

  if(r.view === 'progress'){
    crumbs.push({ label:'My Progress' });
  } else {
    const section = sectionById(r.sectionId);
    if(!section) return '';
    const isLast = !r.partId && !r.activityKey;
    crumbs.push({
      label: section.label,
      href: isLast ? null : hashFor({ view:'section', sectionId:section.id })
    });

    if(r.partId){
      const part = partById(section, r.partId);
      if(part) crumbs.push({
        label: part.label,
        href: r.activityKey ? hashFor({ view:'part', sectionId:section.id, partId:part.id }) : null
      });
    }

    if(r.activityKey){
      const def = activityDef(UNITS[section.unitKey], section.unitKey, r.activityKey);
      crumbs.push({ label: def ? def.title : r.activityKey });
    }
  }

  return `<nav class="crumbs" aria-label="Breadcrumb">${
    crumbs.map((c, i) => {
      const sep = i ? '<span class="crumbSep" aria-hidden="true">›</span>' : '';
      return sep + (c.href
        ? `<a class="crumb" href="${c.href}">${c.label}</a>`
        : `<span class="crumb current" aria-current="page">${c.label}</span>`);
    }).join('')
  }</nav>`;
}

export { renderBreadcrumbs };
