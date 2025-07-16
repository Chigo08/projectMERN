import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (orders) => set({ orders }),
  createOrder: async (newOrder) => {
    try {
      if (!newOrder.customerName || newOrder.menuOrdered.length === 0)
        return { success: false, message: "Masukkan data dengan benar" };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      const data = await res.json();
      set((state) => ({ orders: [...state.orders, data.data] }));
      return { success: true, message: "Data berhasil dibuat" };
    } catch (error) {
      console.log("Error in createOrder store", error);
      set({ error: "Gagal membuat data" });
    }
  },
  deleteOrder: async (oid) => {
    try {
      const res = await fetch(`/api/orders/${oid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        orders: state.orders.filter((order) => order._id !== oid),
      }));
      return { success: true, message: "Data berhasil dihapus" };
    } catch (error) {
      console.log("Error in deleteOrder store", error);
      set({ error: "Gagal menghapus data" });
    }
  },
  updateOrder: async (oid, updatedOrder) => {
    try {
      const res = await fetch(`/api/orders/${oid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      const data = res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        orders: state.orders.map((order) => {
          order._id === oid ? data.data : order;
        }),
      }));

      return { success: true, message: "Pesanan berhasil diupdate" };
    } catch (error) {
      console.log("Error in updateOrder store", error);
      set({ error: "Gagal mengupdate data" });
    }
  },
  fetchOrders: async () => {
    try {
      const res = await fetch("/api/orders");
      const data = res.json();
      set({ orders: data.data });
    } catch (error) {
      console.log("Error in fetchOrders store", error);
      set({ error: "Gagal mengambil data" });
    }
  },
}));

export const useMenuStore = create((set) => ({
  menus: [],
  setMenu: (menus) => set({ menus }),
  createMenu: async (newMenu) => {
    try {
      if (!newMenu.menuName || !newMenu.price)
        return { success: false, message: "Masukkan data dengan benar" };

      const res = await fetch("/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMenu),
      });

      const data = await res.json();
      set((state) => ({ menus: [...state.menus, data.data] }));
      return { success: true, message: "Data berhasil dibuat" };
    } catch (error) {
      console.log("Error in createMenu store", error);
      set({ error: "Gagal membuat data" });
    }
  },
  deleteMenu: async (mid) => {
    try {
      const res = await fetch(`/api/menus/${mid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        menus: state.menus.filter((menu) => menu._id !== mid),
      }));
      return { success: true, message: "Data berhasil dihapus" };
    } catch (error) {
      console.log("Error in deleteMenu store", error);
      set({ error: "Gagal menghapus data" });
    }
  },

  updateMenu: async (mid, updatedMenu) => {
    try {
      const res = await fetch(`/api/menus/${mid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMenu),
      });
      const data = res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        menus: state.menus.map((menu) => {
          menu._id === mid ? data.data : menu;
        }),
      }));

      return { success: true, message: "Data berhasil diupdate" };
    } catch (error) {
      console.log("Error in updateMenu store", error);
      set({ error: "Gagal mengupdate data" });
    }
  },

  fetchMenus: async () => {
    try {
      const res = await fetch("/api/menus");
      const data = res.json();
      set({ menus: data.data });
    } catch (error) {
      console.log("Error in fetchMenus store", error);
      set({ error: "Gagal mengambil data" });
    }
  },
}));