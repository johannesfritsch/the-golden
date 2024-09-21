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
        resolveRequest: (context, moduleName, platform) => {
            if (moduleName === 'crypto') {
                // when importing crypto, resolve to react-native-quick-crypto
                return context.resolveRequest(
                    context,
                    'react-native-quick-crypto',
                    platform,
                )
            } else if (moduleName === 'stream') {
                // when importing stream, resolve to web-streams-polyfill
                return context.resolveRequest(
                    context,
                    'web-streams-polyfill',
                    platform,
                )
            } else if (moduleName === 'readable-stream') {
                // when importing stream, resolve to web-streams-polyfill
                return context.resolveRequest(
                    context,
                    'web-streams-polyfill',
                    platform,
                )
            } else if (moduleName === 'buffer') {
                // when importing buffer, resolve to @craftzdog/react-native-buffer
                return context.resolveRequest(
                    context,
                    '@craftzdog/react-native-buffer',
                    platform,
                )
            }
            // otherwise chain to the standard Metro resolver.
            return context.resolveRequest(context, moduleName, platform)
        },
        assetExts: assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...sourceExts, 'svg'],
    },
};