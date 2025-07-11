import { 
  faUserTie, 
  faUserCog, 
  faCode, 
  faChartLine, 
  faUserNurse,
  faLaptopCode,
  faServer,
  faMobile,
  faWifi,
  faDatabase,
  faClipboardCheck,
  faLeaf,
  faChartBar
} from '@fortawesome/free-solid-svg-icons';

export const getRoleIcon = (role) => {
  const roleLower = role.toLowerCase();
  
  if (roleLower.includes('lead') || roleLower.includes('project lead')) return faUserTie;
  if (roleLower.includes('manager')) return faUserCog;
  if (roleLower.includes('developer')) return faCode;
  if (roleLower.includes('tech lead')) return faChartLine;
  if (roleLower.includes('nursing')) return faUserNurse;
  if (roleLower.includes('architect')) return faLaptopCode;
  if (roleLower.includes('back-end')) return faServer;
  if (roleLower.includes('front-end')) return faMobile;
  if (roleLower.includes('iot')) return faWifi;
  if (roleLower.includes('data')) return faDatabase;
  if (roleLower.includes('qa')) return faClipboardCheck;
  if (roleLower.includes('biodiversity')) return faLeaf;
  if (roleLower.includes('insurance')) return faChartBar;
  
  return faUserCog; // default icon
};
