const fs = require('fs');
const path = require('path');

const folderPath = './mcmeta/assets/minecraft/models/block';

const transparent = [
  "glass",
  "reinforced_glass",
  "white_stained_glass",
  "light_gray_stained_glass",
  "gray_stained_glass",
  "black_stained_glass",
  "brown_stained_glass",
  "red_stained_glass",
  "orange_stained_glass",
  "yellow_stained_glass",
  "lime_stained_glass",
  "green_stained_glass",
  "cyan_stained_glass",
  "light_blue_stained_glass",
  "blue_stained_glass",
  "purple_stained_glass",
  "magenta_stained_glass",
  "pink_stained_glass",
  "beacon"
]


const endings = [
  "_inventory",
  "_lit",
  "_powered",
  "_x",
  "_y",
  "_z",
  "_horizontal",
  "_slab_double",
  "_on",
  "_north_west_mirrored",
];
// ... _0 - _9
Array.from(Array(10).keys()).forEach(e => endings.push("_"+e))


// Read all files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const solid = [];
  // Iterate through each file
  files.forEach((file) => {
    // Check if the file is a JSON file
    if (
        path.extname(file) === '.json' &&
        !transparent.includes(path.basename(file, '.json')) &&
        !endings.some(e => path.basename(file, '.json').endsWith(e))
      ) {
      // Read the contents of the JSON file
      const filePath = path.join(folderPath, file);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContents);

      // Check if the JSON file has a "parent" value equal to "minecraft:block/cube_all"
      if ((jsonData.parent + "").includes('block/cube')) {
        // Log the name of the file (without the .json extension) to the console
        const fileName = path.basename(file, '.json');
        solid.push(fileName);
      }
    }
  });
  console.log(JSON.stringify(solid, null, 2))
});