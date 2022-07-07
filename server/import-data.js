// const { readFile } = require('fs').promises;
// const mongoose = require('mongoose');
// const EntityCategory = require('./app/models/entityCategoryModel');

// mongoose
//   .connect(
//     'mongodb+srv://dbJobHunt:J5zJc3mxs42AE6NO@JobHunt0.r2eon.mongodb.net/JobHunt2020?retryWrites=true&w=majority',
//     {
//       keepAlive: 1,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//     }
//   )
//   .then((data) =>
//     console.log(`connected to database of user: ${data.connections[0].user}`)
//   );

// // const importData = async () => {
// //   try {
// //     let count = 0;
// //     const jsonData = await readFile('./companies-1.json', 'utf-8');
// //     const data = JSON.parse(jsonData);
// //     const dataTosave = [];
// //     // console.log(data);
// //     await Promise.all(
// //       data.map(async (val) => {
// //         const date = parseInt(Date.parse(val.start_date['$date']), 10);
// //         const year = new Date(date).getFullYear();
// //         console.log(val.start_date['$date'], year);
// //         console.log(
// //           'invoked',
// //           parseInt(parseInt(new Date(Date.now()).getFullYear(), 10) - year, 10)
// //         );

// //         const company = await Company.create({
// //           comp_info: {
// //             company_id: val.company_id,
// //             comp_name: val.comapny_name,
// //             founding_year: year,
// //             age: parseInt(
// //               parseInt(new Date(Date.now()).getFullYear(), 10) - year,
// //               10
// //             ),
// //           },
// //           contact_info: {
// //             address: val.company_address,
// //             sub_address: val.company_address_2,
// //             city: val.city,
// //             zipCode: val.company_zip_code,
// //           },
// //           join_date: val.start_date['$date'],
// //         });
// //         count += 1;
// //         console.log(`${count} data uploaded`);
// //       })

// //     );
// //     process.exit();
// //   } catch (err) {
// //     console.log(err);
// //   }
// // };

// const importData = async() => {
//  try {
//   const data =
//  } catch(err){
//    console.log(err);
//  }
// }

// const clearData = async () => {
//   await EntityCategory.deleteMany();
//   console.log('docs deleted');
//   process.exit();
// };

// console.log(process.argv);

// importData();

// // if (process.argv[2] === '--import') {
// //   console.log('invoked')
// //   process.exit(1);
// // }
// // if (process.argv[2] === '--delete') {
// //   clearData();
// //   process.exit(0);
// // }
