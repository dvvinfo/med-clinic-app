import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import mockData from '@/assets/data/mockData.json';

// Интерфейсы
export interface Nurse {
  id: number;
  name: string;
  department: string;
}

// Сохранение данных в localStorage
const saveDataToLocalStorage = (nurses: Nurse[]) => {
  localStorage.setItem('nurses', JSON.stringify(nurses));
};

// Загрузка данных из localStorage или из mockData
const loadDataFromLocalStorage = (): Nurse[] => {
  const storedNurses = localStorage.getItem('nurses');
  return storedNurses ? JSON.parse(storedNurses) : mockData.nurses;
};

export const useNursesStore = defineStore('nurses', () => {
  // Состояние
  const nurses = ref<Nurse[]>(loadDataFromLocalStorage());

  // Действия
  const addNurse = (nurse: Nurse) => {
    nurses.value = [...nurses.value, { ...nurse }]; // Создаем новый массив
    saveDataToLocalStorage(nurses.value);
  };

  const editNurse = (updatedNurse: Nurse) => {
    const index = nurses.value.findIndex((n) => n.id === updatedNurse.id);
    if (index !== -1) {
      const updatedNurses = [...nurses.value];
      updatedNurses[index] = { ...updatedNurse }; // Создаем новый объект
      nurses.value = updatedNurses; // Обновляем массив
      saveDataToLocalStorage(nurses.value);
    }
  };

  const deleteNurse = (id: number) => {
    nurses.value = nurses.value.filter((n) => n.id !== id); // Создаем новый массив
    saveDataToLocalStorage(nurses.value);
  };

  // Автоматическое сохранение в localStorage при изменении массива nurses
  watch(nurses, (newNurses) => saveDataToLocalStorage(newNurses), { deep: true });

  return {
    nurses,
    addNurse,
    editNurse,
    deleteNurse,
  };
});
