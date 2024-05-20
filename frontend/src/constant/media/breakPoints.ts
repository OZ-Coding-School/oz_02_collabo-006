interface Size {
  phone: string;
  tablet: string;
  laptop: string;
  desktop: string;
}

const size: Size = {
  phone: '480px',
  tablet: '768px',
  laptop: '1838px',
  desktop: '3000px',
};

export const device = {
  phone: `(max-width: ${size.phone})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(max-width: ${size.desktop})`,
};