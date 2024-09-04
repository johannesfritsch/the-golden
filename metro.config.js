const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = {
    ...defaultConfig,
    transformer: {
        ...defaultConfig.transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        ...defaultConfig.resolver,
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};