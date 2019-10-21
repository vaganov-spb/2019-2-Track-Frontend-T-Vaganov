function Fill() {
  if (localStorage.getItem('1') === null) {
    localStorage.setItem('1', JSON.stringify({
      name: 'Martin Komitsky',
      flag: true,
      url: 'https://www.danceschool-nrw.de/wp-content/uploads/2019/05/39-512.png',
    }));
  }
  if (localStorage.getItem('2') === null) {
    localStorage.setItem('2', JSON.stringify({
      name: 'Alex Opalev',
      flag: true,
      url: 'https://lh3.googleusercontent.com/XtyURW0mKNnKu_6TzQ5_WpuKF4A7M1oFV6p828eVEWIvTZPtZz2gq5sNM78jpNPMMRmZ',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
  if (localStorage.getItem('3') === null) {
    localStorage.setItem('3', JSON.stringify({
      name: 'Mikhail Priver',
      flag: true,
      url: 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
  if (localStorage.getItem('4') === null) {
    localStorage.setItem('4', JSON.stringify({
      name: 'Anton Mitrikas',
      flag: true,
      url: 'http://www.cubic.net.ua/wp-content/uploads/2018/10/2720751.png',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
  if (localStorage.getItem('5') === null) {
    localStorage.setItem('5', JSON.stringify({
      name: 'Alexey Piskunov',
      flag: true,
      url: 'https://cdn3.iconfinder.com/data/icons/seo-concept-modern/512/Seo_Teach_services_flat_icon_tool_web-512.png',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
  if (localStorage.getItem('6') === null) {
    localStorage.setItem('6', JSON.stringify({
      name: 'Alex Domrachev',
      flag: true,
      url: 'https://cdn1.iconfinder.com/data/icons/science-and-technology-3-7/128/109-512.png',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
  if (localStorage.getItem('7') === null) {
    localStorage.setItem('7', JSON.stringify({
      name: 'Gleb Uvarkin',
      flag: true,
      url: 'https://cdn3.iconfinder.com/data/icons/science-collection/383/scientist-512.png',
    }));
  }
  if (localStorage.getItem('8') === null) {
    localStorage.setItem('8', JSON.stringify({
      name: 'Roma Detinin',
      flag: true,
      url: 'https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
  if (localStorage.getItem('9') === null) {
    localStorage.setItem('9', JSON.stringify({
      name: 'Dima Zagyrsky',
      flag: true,
      url: 'https://cdn3.iconfinder.com/data/icons/education-1-28/49/145-512.png',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
  if (localStorage.getItem('10') === null) {
    localStorage.setItem('10', JSON.stringify({
      name: 'Jennyfer Eshley',
      flag: true,
      url: 'https://med-aprel.ru/wp-content/uploads/2018/01/770136_man_512x512.png',
      mes: [['qwerr', 10, 22], ['drcfrckfmfvkm', 22, 43]],
    }));
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Fill };
