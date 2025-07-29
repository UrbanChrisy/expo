import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@radix-ui/react-navigation-menu';
import React from 'react';

import nativeTabsStyles from './native-tabs-styles';
import type { NativeTabsViewProps } from './types';
import { shouldTabBeVisible } from './utils';

export function NativeTabsView(props: NativeTabsViewProps) {
  const { builder } = props;
  const { state, descriptors, navigation } = builder;
  const { routes } = state;

  const items = routes
    .filter(({ key }) => shouldTabBeVisible(descriptors[key].options))
    .map((route, index) => (
      <TabItem
        key={route.key}
        isFocused={state.index === index}
        title={descriptors[route.key].options.title ?? route.name}
        badgeValue={descriptors[route.key].options.badgeValue}
        onPress={() => {
          navigation.dispatch({
            type: 'JUMP_TO',
            target: state.key,
            payload: {
              name: route.name,
            },
          });
        }}
      />
    ));
  const children = routes
    .filter(
      ({ key }, index) => shouldTabBeVisible(descriptors[key].options) && state.index === index
    )
    .map((route) => {
      return <div className={nativeTabsStyles.tabContent}>{descriptors[route.key].render()}</div>;
    });

  return (
    <div
      className={nativeTabsStyles.nativeTabsContainer}
      style={convertNativeTabsPropsToStyleVars(props.style)}>
      <NavigationMenu className={nativeTabsStyles.navigationMenuRoot}>
        <NavigationMenuList className={nativeTabsStyles.navigationMenuList}>
          {items}
        </NavigationMenuList>
      </NavigationMenu>
      {children}
    </div>
  );
}

interface TabItemProps {
  isFocused: boolean;
  title: string;
  badgeValue?: string;
  onPress: () => void;
}

function TabItem(props: TabItemProps) {
  const { isFocused, title, onPress, badgeValue } = props;
  const isBadgeEmpty = badgeValue === ' ';

  return (
    <NavigationMenuItem className={nativeTabsStyles.navigationMenuItem}>
      <NavigationMenuTrigger
        onClick={onPress}
        className={`${nativeTabsStyles.navigationMenuTrigger} ${isFocused ? nativeTabsStyles.navigationMenuTriggerActive : ''}`}>
        <span className={nativeTabsStyles.tabText}>{title}</span>
        {badgeValue && (
          <div
            className={`${nativeTabsStyles.tabBadge} ${isBadgeEmpty ? nativeTabsStyles.emptyTabBadge : ''}`}>
            {badgeValue}
          </div>
        )}
      </NavigationMenuTrigger>
    </NavigationMenuItem>
  );
}

function convertNativeTabsPropsToStyleVars(
  style: NativeTabsViewProps['style'] | undefined
): Record<string, string | undefined> {
  const vars: Record<`--expo-router-native-tabs-${string}`, string | undefined> = {};
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
  } else if (style.tintColor) {
    vars['--expo-router-native-tabs-active-text-color'] = String(style.tintColor);
  }
  if (style['&:active']?.fontSize) {
    vars['--expo-router-native-tabs-active-font-size'] = String(style['&:active'].fontSize);
  }
  if (style['&:active']?.indicatorColor) {
    vars['--expo-router-native-tabs-active-background-color'] = String(
      style['&:active'].indicatorColor
    );
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
