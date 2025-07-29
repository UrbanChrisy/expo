"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeTabsView = NativeTabsView;
const react_navigation_menu_1 = require("@radix-ui/react-navigation-menu");
const react_1 = __importDefault(require("react"));
const native_tabs_styles_1 = __importDefault(require("./native-tabs-styles"));
const utils_1 = require("./utils");
function NativeTabsView(props) {
    const { builder } = props;
    const { state, descriptors, navigation } = builder;
    const { routes } = state;
    const items = routes
        .filter(({ key }) => (0, utils_1.shouldTabBeVisible)(descriptors[key].options))
        .map((route, index) => (<TabItem key={route.key} isFocused={state.index === index} title={descriptors[route.key].options.title ?? route.name} badgeValue={descriptors[route.key].options.badgeValue} onPress={() => {
            navigation.dispatch({
                type: 'JUMP_TO',
                target: state.key,
                payload: {
                    name: route.name,
                },
            });
        }}/>));
    const children = routes
        .filter(({ key }, index) => (0, utils_1.shouldTabBeVisible)(descriptors[key].options) && state.index === index)
        .map((route) => {
        return <div className={native_tabs_styles_1.default.tabContent}>{descriptors[route.key].render()}</div>;
    });
    return (<div className={native_tabs_styles_1.default.nativeTabsContainer} style={convertNativeTabsPropsToStyleVars(props.style)}>
      <react_navigation_menu_1.NavigationMenu className={native_tabs_styles_1.default.navigationMenuRoot}>
        <react_navigation_menu_1.NavigationMenuList className={native_tabs_styles_1.default.navigationMenuList}>
          {items}
        </react_navigation_menu_1.NavigationMenuList>
      </react_navigation_menu_1.NavigationMenu>
      {children}
    </div>);
}
function TabItem(props) {
    const { isFocused, title, onPress, badgeValue } = props;
    const isBadgeEmpty = badgeValue === ' ';
    return (<react_navigation_menu_1.NavigationMenuItem className={native_tabs_styles_1.default.navigationMenuItem}>
      <react_navigation_menu_1.NavigationMenuTrigger onClick={onPress} className={`${native_tabs_styles_1.default.navigationMenuTrigger} ${isFocused ? native_tabs_styles_1.default.navigationMenuTriggerActive : ''}`}>
        <span className={native_tabs_styles_1.default.tabText}>{title}</span>
        {badgeValue && (<div className={`${native_tabs_styles_1.default.tabBadge} ${isBadgeEmpty ? native_tabs_styles_1.default.emptyTabBadge : ''}`}>
            {badgeValue}
          </div>)}
      </react_navigation_menu_1.NavigationMenuTrigger>
    </react_navigation_menu_1.NavigationMenuItem>);
}
function convertNativeTabsPropsToStyleVars(style) {
    const vars = {};
    if (!style) {
        return vars;
    }
    if (style.fontFamily) {
        vars['--expo-router-native-tabs-font-family'] = String(style.fontFamily);
    }
    if (style.fontSize) {
        vars['--expo-router-native-tabs-font-size'] = String(style.fontSize);
    }
    if (style.fontWeight) {
        vars['--expo-router-native-tabs-font-weight'] = String(style.fontWeight);
    }
    if (style.fontStyle) {
        vars['--expo-router-native-tabs-font-style'] = String(style.fontStyle);
    }
    if (style.color) {
        vars['--expo-router-native-tabs-text-color'] = String(style.color);
    }
    if (style['&:active']?.color) {
        vars['--expo-router-native-tabs-active-text-color'] = String(style['&:active'].color);
    }
    else if (style.tintColor) {
        vars['--expo-router-native-tabs-active-text-color'] = String(style.tintColor);
    }
    if (style['&:active']?.fontSize) {
        vars['--expo-router-native-tabs-active-font-size'] = String(style['&:active'].fontSize);
    }
    if (style['&:active']?.indicatorColor) {
        vars['--expo-router-native-tabs-active-background-color'] = String(style['&:active'].indicatorColor);
    }
    if (style.backgroundColor) {
        vars['--expo-router-native-tabs-background-color'] = String(style.backgroundColor);
    }
    if (style.badgeBackgroundColor) {
        vars['--expo-router-native-tabs-badge-background-color'] = String(style.badgeBackgroundColor);
    }
    if (style.badgeTextColor) {
        vars['--expo-router-native-tabs-badge-text-color'] = String(style.badgeTextColor);
    }
    return vars;
}
//# sourceMappingURL=NativeTabsView.web.js.map