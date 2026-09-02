import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomizationContext = createContext(null);

const STORAGE_KEY_THEME = 'utsav_selected_theme';
const STORAGE_KEY_ADDONS = 'utsav_selected_addons';

export const CustomizationProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_THEME);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [selectedAddons, setSelectedAddons] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_ADDONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to sessionStorage
  useEffect(() => {
    if (selectedTheme) {
      sessionStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(selectedTheme));
    } else {
      sessionStorage.removeItem(STORAGE_KEY_THEME);
    }
  }, [selectedTheme]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY_ADDONS, JSON.stringify(selectedAddons));
  }, [selectedAddons]);

  const selectTheme = (theme) => {
    setSelectedTheme({
      id: theme.id,
      name: theme.name,
      slug: theme.slug,
      shortDesc: theme.shortDesc,
      coverImage: Array.isArray(theme.images) && theme.images.length > 0 ? theme.images[0] : (theme.coverImage || ''),
      categoryName: theme.category ? theme.category.name : '',
    });
  };

  const clearTheme = () => {
    setSelectedTheme(null);
  };

  const addAddon = (addon, quantity = 1) => {
    setSelectedAddons((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === addon.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: addon.id,
          name: addon.name,
          image: addon.image,
          itemCategory: addon.itemCategory,
          unitType: addon.unitType,
          quantity: quantity,
        },
      ];
    });
  };

  const removeAddon = (addonId) => {
    setSelectedAddons((prev) => prev.filter((item) => item.id !== addonId));
  };

  const updateAddonQty = (addonId, delta) => {
    setSelectedAddons((prev) => {
      return prev
        .map((item) => {
          if (item.id === addonId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const isAddonSelected = (addonId) => {
    return selectedAddons.some((item) => item.id === addonId);
  };

  const getAddonQty = (addonId) => {
    const item = selectedAddons.find((item) => item.id === addonId);
    return item ? item.quantity : 0;
  };

  const clearAllCustomizations = () => {
    setSelectedTheme(null);
    setSelectedAddons([]);
    sessionStorage.removeItem(STORAGE_KEY_THEME);
    sessionStorage.removeItem(STORAGE_KEY_ADDONS);
  };

  const totalAddonsCount = selectedAddons.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <CustomizationContext.Provider
      value={{
        selectedTheme,
        selectedAddons,
        selectTheme,
        clearTheme,
        addAddon,
        removeAddon,
        updateAddonQty,
        isAddonSelected,
        getAddonQty,
        clearAllCustomizations,
        totalAddonsCount,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error('useCustomization must be used within a CustomizationProvider');
  }
  return context;
};
