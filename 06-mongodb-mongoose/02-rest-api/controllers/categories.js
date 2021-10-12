const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  // const findCategories = [
  //   {
  //     id: '5d208e631866a7366d831ff1',
  //     title: 'Category1',
  //     subcategories: [{
  //       id: '5d208e631866a7366d83_1_1',
  //       title: 'Subcategory1.1',
  //     }, {
  //       id: '5d208e631866a7366d83_1_2',
  //       title: 'Subcategory1.2',
  //     }],
  //   },

  //   {
  //     id: '5d208e631866a7366d831ff2',
  //     title: 'Category2',
  //     subcategories: [{
  //       id: '5d208e631866a7366d83_2_1',
  //       title: 'Subcategory2.1',
  //     }],
  //   },
  // ];
  const categories = await Category.find({});

  console.log(categories);

  ctx.body = {
    categories: [...categories].map((category) => ({
      id: category._id,
      title: category.title,
      subcategories: category.subcategories.map((sub) => ({
        id: sub._id,
        title: sub.title,
      })),
    })),
  };
};

// {
//   categories: [
//     {
//     id: '5d208e631866a7366d831ffc',
//     title: 'Category1',
//     subcategories: [{
//       id: '5d208e631866a7366d831ffd',
//       title: 'Subcategory1'
//     }]
//   }
//   ]
// }
