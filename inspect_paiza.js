const fs = require('fs');
const path = require('path');
const props = JSON.parse(fs.readFileSync(path.join(process.env.TEMP, 'paiza_props.json'), 'utf8'));

console.log('--- Popular Work Groups (first 3) ---');
props.popularWorkGroups.slice(0, 3).forEach(g => {
  console.log({
    id: g.id,
    title: g.title,
    caption: g.caption,
    badgeText: g.badgeText,
    badgeColor: g.badgeColor,
    imagePath: g.imagePath,
    lessonsCount: g.lessonsCount,
    worksCount: g.worksCount,
    estimatedLearningMinutes: g.estimatedLearningMinutes
  });
});

console.log('--- Learning Paths (first 3) ---');
props.otherLearningPaths.slice(0, 3).forEach(p => {
  console.log({
    id: p.id,
    title: p.title,
    iconLabel: p.iconLabel,
    totalSteps: p.totalSteps,
    estimatedLearningHours: p.estimatedLearningHours
  });
});

