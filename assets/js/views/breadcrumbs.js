/* Breadcrumb trail, derived entirely from the route so it can never drift out
   of step with the URL. Every crumb but the last is a real link. */
import { S } from '../state.js';
import { getSection, getPart, getActivity } from '../content/model.js';
import { hashFor } from '../router.js';
import { activityTitle } from './labels.js';

function renderBreadcrumbs(){
  const r = S.route || { view:'home' };
  if(r.view === 'home') return '';
  const crumbs = [{ label:'Home', href:'#/' }];

  if(r.view === 'progress'){
    crumbs.push({ label:'My Progress' });
  } else {
    const section = getSection(r.sectionId);
    if(!section) return '';
    const last = !r.partId && !r.activityId;
    crumbs.push({ label: section.label, href: last ? null : hashFor({ view:'section', sectionId:section.id }) });

    if(r.partId){
      const part = getPart(section.id, r.partId);
      if(part) crumbs.push({
        label: part.label,
        href: r.activityId ? hashFor({ view:'part', sectionId:section.id, partId:part.id }) : null
      });
    }
    if(r.activityId){
      const act = getActivity(section.id, r.partId || null, r.activityId);
      crumbs.push({ label: act ? activityTitle(act) : r.activityId });
    }
  }

  return `<nav class="crumbs" aria-label="Breadcrumb">${crumbs.map((c,i) => {
    const sep = i ? '<span class="crumbSep" aria-hidden="true">›</span>' : '';
    return sep + (c.href
      ? `<a class="crumb" href="${c.href}">${c.label}</a>`
      : `<span class="crumb current" aria-current="page">${c.label}</span>`);
  }).join('')}</nav>`;
}

export { renderBreadcrumbs };
