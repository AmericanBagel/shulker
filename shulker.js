const fs = require('fs/promises')
const createWriteStream = require('fs').createWriteStream
const path = require('path')
const nbt = require('prismarine-nbt')
const _ = require('lodash')

const assetsPath = path.normalize('mcmeta/assets')
const blockModelsPath = path.normalize(assetsPath + '/minecraft/models/block')

const INVISIBLE = ['air', 'void_air', 'cave_air', 'structure_void', 'barrier']

const SOLID = [
  'acacia_log',
  'acacia_planks',
  'acacia_wood',
  'amethyst_block',
  'ancient_debris',
  'andesite',
  'azalea_leaves',
  'bamboo_block',
  'bamboo_mosaic',
  'bamboo_planks',
  'barrel',
  'barrel_open',
  'basalt',
  'bedrock',
  'bedrock_mirrored',
  'birch_log',
  'birch_planks',
  'birch_wood',
  'black_concrete',
  'black_concrete_powder',
  'black_terracotta',
  'black_wool',
  'blackstone',
  'blue_concrete',
  'blue_concrete_powder',
  'blue_ice',
  'blue_terracotta',
  'blue_wool',
  'bone_block',
  'bookshelf',
  'brain_coral_block',
  'bricks',
  'brown_concrete',
  'brown_concrete_powder',
  'brown_terracotta',
  'brown_wool',
  'bubble_coral_block',
  'budding_amethyst',
  'calcite',
  'cartography_table',
  'cherry_log',
  'cherry_planks',
  'cherry_wood',
  'chiseled_copper',
  'chiseled_deepslate',
  'chiseled_nether_bricks',
  'chiseled_polished_blackstone',
  'chiseled_quartz_block',
  'chiseled_red_sandstone',
  'chiseled_sandstone',
  'chiseled_stone_bricks',
  'chiseled_tuff',
  'chiseled_tuff_bricks',
  'clay',
  'coal_block',
  'coal_ore',
  'coarse_dirt',
  'cobbled_deepslate',
  'cobblestone',
  'copper_block',
  'copper_bulb',
  'copper_grate',
  'copper_ore',
  'cracked_deepslate_bricks',
  'cracked_deepslate_tiles',
  'cracked_nether_bricks',
  'cracked_polished_blackstone_bricks',
  'cracked_stone_bricks',
  'crafting_table',
  'crimson_hyphae',
  'crimson_nylium',
  'crimson_planks',
  'crimson_stem',
  'crying_obsidian',
  'cube_all',
  'cube_all_inner_faces',
  'cube_bottom_top',
  'cube_bottom_top_inner_faces',
  'cube_column',
  'cube_column_mirrored',
  'cube_mirrored_all',
  'cube_north_west_mirrored_all',
  'cube_top',
  'cut_copper',
  'cut_red_sandstone',
  'cut_sandstone',
  'cyan_concrete',
  'cyan_concrete_powder',
  'cyan_terracotta',
  'cyan_wool',
  'dark_oak_log',
  'dark_oak_planks',
  'dark_oak_wood',
  'dark_prismarine',
  'dead_brain_coral_block',
  'dead_bubble_coral_block',
  'dead_fire_coral_block',
  'dead_horn_coral_block',
  'dead_tube_coral_block',
  'deepslate',
  'deepslate_bricks',
  'deepslate_coal_ore',
  'deepslate_copper_ore',
  'deepslate_diamond_ore',
  'deepslate_emerald_ore',
  'deepslate_gold_ore',
  'deepslate_iron_ore',
  'deepslate_lapis_ore',
  'deepslate_mirrored',
  'deepslate_redstone_ore',
  'deepslate_tiles',
  'diamond_block',
  'diamond_ore',
  'diorite',
  'dirt',
  'dripstone_block',
  'emerald_block',
  'emerald_ore',
  'end_stone',
  'end_stone_bricks',
  'exposed_chiseled_copper',
  'exposed_copper',
  'exposed_copper_bulb',
  'exposed_copper_grate',
  'exposed_cut_copper',
  'fire_coral_block',
  'fletching_table',
  'flowering_azalea_leaves',
  'gilded_blackstone',
  'glowstone',
  'gold_block',
  'gold_ore',
  'granite',
  'grass_block_snow',
  'gravel',
  'gray_concrete',
  'gray_concrete_powder',
  'gray_terracotta',
  'gray_wool',
  'green_concrete',
  'green_concrete_powder',
  'green_terracotta',
  'green_wool',
  'hay_block',
  'honeycomb_block',
  'horn_coral_block',
  'ice',
  'iron_block',
  'iron_ore',
  'jigsaw',
  'jukebox',
  'jungle_log',
  'jungle_planks',
  'jungle_wood',
  'lapis_block',
  'lapis_ore',
  'light_blue_concrete',
  'light_blue_concrete_powder',
  'light_blue_terracotta',
  'light_blue_wool',
  'light_gray_concrete',
  'light_gray_concrete_powder',
  'light_gray_terracotta',
  'light_gray_wool',
  'lime_concrete',
  'lime_concrete_powder',
  'lime_terracotta',
  'lime_wool',
  'lodestone',
  'magenta_concrete',
  'magenta_concrete_powder',
  'magenta_terracotta',
  'magenta_wool',
  'magma_block',
  'mangrove_log',
  'mangrove_planks',
  'mangrove_wood',
  'melon',
  'moss_block',
  'mossy_cobblestone',
  'mossy_stone_bricks',
  'mud',
  'mud_bricks',
  'muddy_mangrove_roots',
  'mycelium',
  'nether_bricks',
  'nether_gold_ore',
  'nether_quartz_ore',
  'nether_wart_block',
  'netherite_block',
  'netherrack',
  'note_block',
  'oak_log',
  'oak_planks',
  'oak_wood',
  'obsidian',
  'ochre_froglight',
  'orange_concrete',
  'orange_concrete_powder',
  'orange_terracotta',
  'orange_wool',
  'orientable_vertical',
  'orientable_with_bottom',
  'oxidized_chiseled_copper',
  'oxidized_copper',
  'oxidized_copper_bulb',
  'oxidized_copper_grate',
  'oxidized_cut_copper',
  'packed_ice',
  'packed_mud',
  'pearlescent_froglight',
  'pink_concrete',
  'pink_concrete_powder',
  'pink_terracotta',
  'pink_wool',
  'podzol',
  'polished_andesite',
  'polished_basalt',
  'polished_blackstone',
  'polished_blackstone_bricks',
  'polished_deepslate',
  'polished_diorite',
  'polished_granite',
  'polished_tuff',
  'prismarine',
  'prismarine_bricks',
  'pumpkin',
  'purple_concrete',
  'purple_concrete_powder',
  'purple_terracotta',
  'purple_wool',
  'purpur_block',
  'purpur_pillar',
  'quartz_block',
  'quartz_bricks',
  'quartz_pillar',
  'raw_copper_block',
  'raw_gold_block',
  'raw_iron_block',
  'red_concrete',
  'red_concrete_powder',
  'red_nether_bricks',
  'red_sand',
  'red_sandstone',
  'red_terracotta',
  'red_wool',
  'redstone_block',
  'redstone_lamp',
  'redstone_ore',
  'reinforced_deepslate',
  'rooted_dirt',
  'sand',
  'sandstone',
  'sculk',
  'sculk_catalyst',
  'sculk_catalyst_bloom',
  'sculk_mirrored',
  'sea_lantern',
  'shroomlight',
  'smithing_table',
  'smooth_basalt',
  'smooth_quartz',
  'smooth_red_sandstone',
  'smooth_sandstone',
  'smooth_stone',
  'snow_block',
  'soul_sand',
  'soul_soil',
  'spawner',
  'sponge',
  'spruce_log',
  'spruce_planks',
  'spruce_wood',
  'stone',
  'stone_bricks',
  'stone_mirrored',
  'stripped_acacia_log',
  'stripped_acacia_wood',
  'stripped_bamboo_block',
  'stripped_birch_log',
  'stripped_birch_wood',
  'stripped_cherry_log',
  'stripped_cherry_wood',
  'stripped_crimson_hyphae',
  'stripped_crimson_stem',
  'stripped_dark_oak_log',
  'stripped_dark_oak_wood',
  'stripped_jungle_log',
  'stripped_jungle_wood',
  'stripped_mangrove_log',
  'stripped_mangrove_wood',
  'stripped_oak_log',
  'stripped_oak_wood',
  'stripped_spruce_log',
  'stripped_spruce_wood',
  'stripped_warped_hyphae',
  'stripped_warped_stem',
  'structure_block',
  'structure_block_corner',
  'structure_block_data',
  'structure_block_load',
  'structure_block_save',
  'target',
  'template_command_block',
  'template_glazed_terracotta',
  'terracotta',
  'tinted_glass',
  'tnt',
  'trial_spawner',
  'trial_spawner_active',
  'trial_spawner_ejecting_reward',
  'tube_coral_block',
  'tuff',
  'tuff_bricks',
  'verdant_froglight',
  'warped_hyphae',
  'warped_nylium',
  'warped_planks',
  'warped_stem',
  'warped_wart_block',
  'weathered_chiseled_copper',
  'weathered_copper',
  'weathered_copper_bulb',
  'weathered_copper_grate',
  'weathered_cut_copper',
  'wet_sponge',
  'white_concrete',
  'white_concrete_powder',
  'white_terracotta',
  'white_wool',
  'yellow_concrete',
  'yellow_concrete_powder',
  'yellow_terracotta',
  'yellow_wool'
]

/**
 * Compares two arrays to check if they are equal.
 *
 * @param {Array} a - The first array to compare.
 * @param {Array} b - The second array to compare.
 * @return {boolean} Returns true if the arrays are equal, false otherwise.
 */
const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index])

/**
 * Adds a prefix to each key in the given object.
 *
 * @param {Object} object - The object to modify.
 * @param {string} prefix - The prefix to add to each key.
 * @return {Object} - The modified object with prefixed keys.
 */
function addPrefixToKeys(object, prefix) {
  return Object.keys(object).reduce((result, key) => {
      result[prefix + key] = object[key];
      return result;
  }, {});
}

/**
 * Removes the 'minecraft:' namespace from a given string.
 *
 * @param {string} string - The string to remove the namespace from.
 * @return {string} The string with the 'minecraft:' namespace removed.
 */
const removeNamespace = (string) => string.replace('minecraft:', '')

/**
 * Retrieves the block model for the specified block name, without descending into parent models.
 *
 * @param {string} blockName - The name of the block.
 * @param {string} assetsPath - The path to the assets directory.
 * @return {Object} The block model as a JSON object.
 */
async function getSingleBlockModel (
  blockName,
  assetsPath = 'mcmeta/assets/minecraft/models/block'
) {
  const fullPath = path.normalize(
    `${assetsPath}/${removeNamespace(blockName)}.json`
  )
  const buffer = await fs.readFile(fullPath)
  return JSON.parse(buffer)
}

/**
 * Merges two or more objects, recursively combining any child objects.
 * Later objects' properties take precedence over earlier objects'.
 *
 * @param {...Object} objects - The objects to merge.
 * @return {Object} The merged object.
 */
const mergeObjects = (...objects) => {
  return objects.reduce((accumulator, current) => {
    Object.keys(current).forEach((key) => {
      if (current[key] instanceof Object && key in accumulator) {
        accumulator[key] = mergeObjects(accumulator[key], current[key])
      } else {
        accumulator[key] = current[key]
      }
    })
    return accumulator
  }, {})
}

/**
 * Retrieves an array of block models for the specified block name and its parents
 *
 * @param {string} blockName - The name of the block.
 * @return {Promise<Object[]>} The array of block models.
 */
async function getBlockModelParents (blockName) {
  const models = []
  let model = await getSingleBlockModel(blockName)

  while (model.parent) {
    // Clean up parent name
    const parentName = model.parent.replace(
      /(^minecraft:block\/)|(^block\/)/,
      ''
    )
    // Set new model to parent model
    model = await getSingleBlockModel(parentName)
    // Add model to start of models list. Highest ancestor goes first.
    models.unshift(model)
  }

  // Add first descendant model to the end of the models list
  models.push(await getSingleBlockModel(blockName))

  // Return list of models from ancestor to descendent
  return models
}

/**
 * Merges an array of objects starting from the first element, merging in pairs, to the last
 *
 * @param {Object[]} objects - The array of objects to merge.
 * @return {Object} The merged object.
 */
function mergeBlockModels (objects) {
  while (objects.length > 1) {
    const merge = mergeObjects(objects[0], objects[1])
    objects.splice(0, 2, merge)
  }

  return objects[0]
}

/**
 * Retrieves the block model for the specified block name by getting all the parent models and merging them
 *
 * @param {string} blockName - The name of the block.
 * @param {string} assetsPath - The path to the assets.
 * @return {Promise<Object>} The merged block model.
 */
async function getBlockModel (blockName, assetsPath) {
  const models = await getBlockModelParents(blockName)
  const mergedModel = mergeBlockModels(models)

  return mergedModel
}

/**
 * Processes the block state by performing various operations on it.
 *
 * @param {object} blockState - The block state object to process.
 * @param {string} assetsPath - The path to the assets.
 * @param {object} structure - The structure object.
 * @param {object} model - The model object.
 */
async function processBlockState(blockState, assetsPath, structure, model) {
  const blockName = removeNamespace(blockState.Name);
  const blockModel = await getBlockModel(blockName, assetsPath);
  const largestDimension = Math.max(...structure.size);

  scaleElementSizes(blockModel.elements, largestDimension);
  removeParticleTexture(blockModel.textures);
  addPrefixToTextureKeys(blockModel.textures, blockName);
  updateTextureReferences(blockModel.textures, blockName);
  addTexturesToModel(blockModel.textures, model);

  blockState.model = blockModel;
}

/**
 * Scales the sizes of the given elements based on the largest dimension.
 *
 * @param {Array} elements - An array of elements to scale.
 * @param {number} largestDimension - The largest dimension to scale the elements to.
 */
function scaleElementSizes(elements, largestDimension) {
  elements.forEach((element) => {
    element.from = scale(element.from, largestDimension);
    element.to = scale(element.to, largestDimension);
  });
}

/**
 * Scales the elements in the array by dividing each element by the largest dimension.
 *
 * @param {Array} array - The array to be scaled.
 * @param {number} largestDimension - The largest dimension used to scale the array.
 * @return {Array} - The scaled array.
 */
function scale(array, largestDimension) {
  return array.map((e) => e / largestDimension);
}

/**
 * Removes the particle texture from the given textures object, if it exists.
 *
 * @param {object} textures - The textures object from which to remove the particle texture.
 */
function removeParticleTexture(textures) {
  if ('particle' in textures) {
    delete textures.particle;
  }
}

/**
 * Adds a prefix to the keys of a textures object.
 *
 * @param {object} textures - The textures object.
 * @param {string} prefix - The prefix to add to the keys.
 */
function addPrefixToTextureKeys(textures, prefix) {
  for (let key in textures) {
    textures[prefix + '_' + key] = textures[key];
    delete textures[key];
  }
}

/**
 * Updates the references to textures in the given object.
 *
 * @param {Object} textures - The object containing the texture references to update.
 * @param {string} blockName - The name of the block.
 */
function updateTextureReferences(textures, blockName) {
  for (let key in textures) {
    if (textures[key].startsWith('#')) {
      const newValue = `#${blockName}_${textures[key].substring(1)}`;
      textures[key] = newValue;
    }
  }
}

/**
 * Adds textures to a model.
 *
 * @param {object} textures - The textures to add to the model.
 * @param {object} model - The model to add the textures to.
 */
function addTexturesToModel(textures, model) {
  Object.assign(model.textures, textures);
}

/**
 * Process the block states of a structure.
 *
 * @param {Object} structure - The structure to process.
 * @param {string} assetsPath - The path to the assets.
 * @param {Object} model - The model to use.
 * @return {Promise<void>} A promise that resolves when all block states are processed.
 */
async function processBlockStates(structure, assetsPath, model) {
  await Promise.all(
    structure.palette.map(async (blockState) => {
      await processBlockState(blockState, assetsPath, structure, model);
    })
  );
}

async function main (file, options = { culling: ['invisible'] }) {
  const buffer = await fs.readFile(file)
  const { parsed, type } = await nbt.parse(buffer)
  const structure = await nbt.simplify(parsed)
  const model = {
    textures: {
      // Textures will be added here, e.g.:
      // "#minecraft:dirt": "block/dirt",
    },
    elements: [
      /* Elements from other blocks' models will be added here, e.g.
        {   "from": [ 0, 0, 0 ],
            "to": [ 16, 16, 16 ],
            "faces": {
                "down":  { "texture": "#minecraft:dirt-down", "cullface": "down" },
                "up":    { "texture": "#minecraft:dirt-up", "cullface": "up" },
                "north": { "texture": "#minecraft:dirt-north", "cullface": "north" },
                "south": { "texture": "#minecraft:dirt-south", "cullface": "south" },
                "west":  { "texture": "#minecraft:dirt-west", "cullface": "west" },
                "east":  { "texture": "#minecraft:dirt-east", "cullface": "east" }
            }
        }
      */
    ]
  }

  /*
    - [x] Make a list of all the block types
    - [/] Cull blocks:
      - [x] Cull any blocks with a state id that matches any block state's ID in the pallete which matches one of the hard-coded ignored blocks (e.g. air)
      - [x] Cull any blocks which are completely surrounded by opaque blocks (should get rid of filled-in area blocks and just leave perimeter in, for example, the ground)
      - [ ] Add advanced culling methods later -- these two methods should get rid of over 50% of the lag
    - [ ] For each block type/state (by block type to only have to grab the model once!):
      - [x] Grab the block model
      - [x] Merge any parent models
      - [x] Scale element sizes (from, to) based on scale
      - [x] Add block model name prefix to each of the textures
      - [x] Push textures to model's textures
      - [x] Map the textures in the current block model to add the prefix
      - [x] For each block in block states:
        - [x] Offset (add) element positions the block's position in the structure
        - [x] Add elements
  */

  // Add name field to block because states are annoying
  async function addNamesToBlocks () {
    await structure.blocks.forEach((block) => {
      block.name = structure.palette[block.state].Name
    })
  }
  await addNamesToBlocks()

  async function cullInvisible () {
    /// Filter out culled blocks
    structure.blocks = structure.blocks.filter(
      (block) => !INVISIBLE.includes(removeNamespace(block.name))
    )
    structure.palette = structure.palette.filter(
      (block) => !INVISIBLE.includes(removeNamespace(block.Name))
    )
  }

  async function cullEnclosed () {
    // Cull blocks which are surrounded by solid blocks on all faces
    structure.blocks = structure.blocks.filter((block) => {
      const getBlock = (pos) =>
        structure.blocks.find((b) => compareArrays(b.pos, pos))
      const isSolid = (block) => SOLID.includes(removeNamespace(block.name))

      // Check if all adjacent faces of the block are solid
      const adjacentPositions = [
        [block.pos[0] - 1, block.pos[1], block.pos[2]],
        [block.pos[0] + 1, block.pos[1], block.pos[2]],
        [block.pos[0], block.pos[1] - 1, block.pos[2]],
        [block.pos[0], block.pos[1] + 1, block.pos[2]],
        [block.pos[0], block.pos[1], block.pos[2] - 1],
        [block.pos[0], block.pos[1], block.pos[2] + 1]
      ]
      // Return false if surrounded
      return !adjacentPositions.every((pos) => isSolid(getBlock(pos)))
    })
  }

  async function cull() {
    const shouldCullInvisible = options.culling.includes('invisible') || options.culling === 'full'
    const shouldCullEnclosed = options.culling.includes('enclosed') || options.culling === 'full'

    if (shouldCullInvisible) {
      await cullInvisible()
    }
    if (shouldCullEnclosed) {
      await cullEnclosed()
    }
  }

  // Cull if enabled
  const shouldCull = options.culling !== null && options.culling !== undefined && options.culling.length || options.culling === 'full'
  if (shouldCull) {
    await cull()
  }

  // Processing for each block state
  await processBlockStates(structure, assetsPath, model);

  console.log(JSON.stringify(structure.palette));

  /*
  Models look like this:
  ```
  {
    "pos": number[], (triple of coords of block in structure)
    "state": number (index of block state in palette)
  }
  ```
  */

  // Manage individual blocks and add them to model
  await structure.blocks.forEach(block => {

    /* // WARNING: If you want to optimize something, OPTIMIZE THIS!
    // Deep cloning for each block is a HORRIBLE idea. TODO: Replace deep cloning whole block model with just cloning elements
    const blockState = _.cloneDeep(structure.palette[block.state]);

    // Offset element.from and element.to positions by the block's position (block.pos) relative to the structure
    blockState.elements = blockState.elements.map(element => {
      function offset(array) {
        return array.map((e, i) => e + block.pos[i]);
      }

      element.from = offset(element.from);
      element.to = offset(element.to);

      // Add block state elements to block model elements
      model.elements.push(...blockState.elements);
    }) */
  });
}

main('structure.nbt')
