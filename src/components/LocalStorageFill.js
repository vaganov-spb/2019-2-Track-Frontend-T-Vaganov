export function Fill() {
	let counter = 0;
	for (counter = 1; counter <= 10; counter += 1) {
		if (localStorage.getItem(`${counter}`) === null) {
			localStorage.setItem(`${counter}`, JSON.stringify(storageArray[counter - 1]));
		}
	}
}

const storageArray = [
	{
		name: 'Martin Komitsky',
		flag: true,
		url: 'https://www.danceschool-nrw.de/wp-content/uploads/2019/05/39-512.png',
		mes: [],
	},

	{
		name: 'Alex Opalev',
		flag: true,
		url: 'https://lh3.googleusercontent.com/XtyURW0mKNnKu_6TzQ5_WpuKF4A7M1oFV6p828eVEWIvTZPtZz2gq5sNM78jpNPMMRmZ',
		mes: [
			['qwerr', 10, 22],
			['drcfrckfmfvkm', 22, 43],
		],
	},

	{
		name: 'Mikhail Priver',
		flag: true,
		url: 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
		mes: [
			['qwerr', 10, 22],
			['drcfrckfmfvkm', 22, 43],
		],
	},

	{
		name: 'Anton Mitrikas',
		flag: true,
		url: 'http://www.cubic.net.ua/wp-content/uploads/2018/10/2720751.png',
		mes: [
			['qwerr', 10, 22],
			['drcfrckfmfvkm', 22, 43],
		],
	},

	{
		name: 'Alexey Piskunov',
		flag: true,
		url: 'https://cdn3.iconfinder.com/data/icons/seo-concept-modern/512/Seo_Teach_services_flat_icon_tool_web-512.png',
		mes: [
			['qwerr', 10, 22],
			['drcfrckfmfvkm', 22, 43],
			['1frckfmfvkm', 22, 43],
			['2rcfrckfmfvkm', 22, 43],
			['qwerr', 10, 22],
		],
	},

	{
		name: 'Alex Domrachev',
		flag: true,
		url: 'https://cdn1.iconfinder.com/data/icons/science-and-technology-3-7/128/109-512.png',
		mes: [
			['qwerr', 10, 22],
			['drcfrckfmfvkm', 22, 43],
		],
	},

	{
		name: 'Gleb Uvarkin',
		flag: true,
		url: 'https://cdn3.iconfinder.com/data/icons/science-collection/383/scientist-512.png',
		mes: [],
	},

	{
		name: 'Roma Detinin',
		flag: false,
		url: 'https://cdn0.iconfinder.com/data/icons/avatar-78/128/12-512.png',
		mes: [
			['qwerr', 10, 22],
			['drcfrckfmfvkm', 22, 43],
		],
	},

	{
		name: 'Dima Zagyrsky',
		flag: false,
		url: 'https://cdn3.iconfinder.com/data/icons/education-1-28/49/145-512.png',
		mes: [
			['qwerr', 10, 22],
			['drcrrrrrrrrrrrrrrrrrrrrrrrkfmfvkm', 22, 43],
		],
	},

	{
		name: 'Jennyfer Eshley',
		flag: null,
		url: 'https://med-aprel.ru/wp-content/uploads/2018/01/770136_man_512x512.png',
		mes: [['qwerr', 10, 22]],
	},
];
