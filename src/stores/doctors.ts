import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import mockData from '@/assets/data/mockData.json';

// Интерфейсы
export interface Doctor {
  id: number;
  name: string;
  department: string;
  isHead: boolean;
}

// Сохранение данных в localStorage
const saveDataToLocalStorage = (doctors: Doctor[]) => {
  localStorage.setItem('doctors', JSON.stringify(doctors));
};

// Загрузка данных из localStorage или из mockData
const loadDataFromLocalStorage = (): Doctor[] => {
  const storedDoctors = localStorage.getItem('doctors');
  return storedDoctors ? JSON.parse(storedDoctors) : mockData.doctors;
};

export const useDoctorsStore = defineStore('doctors', () => {
  // Состояние
  const doctors = ref<Doctor[]>(loadDataFromLocalStorage());

  // Действия
  const addDoctor = (doctor: Doctor) => {
    doctors.value = [...doctors.value, { ...doctor }]; // Создаем новый массив
    saveDataToLocalStorage(doctors.value);
  };

  const editDoctor = (updatedDoctor: Doctor) => {
    const index = doctors.value.findIndex((d) => d.id === updatedDoctor.id);
    if (index !== -1) {
      const updatedDoctors = [...doctors.value];
      updatedDoctors[index] = { ...updatedDoctor }; // Создаем новый объект
      doctors.value = updatedDoctors; // Обновляем массив
      saveDataToLocalStorage(doctors.value);
    }
  };

  const deleteDoctor = (id: number) => {
    doctors.value = doctors.value.filter((d) => d.id !== id); // Создаем новый массив
    saveDataToLocalStorage(doctors.value);
  };

  // Автоматическое сохранение в localStorage при изменении массива doctors
  watch(doctors, (newDoctors) => saveDataToLocalStorage(newDoctors), { deep: true });

  return {
    doctors,
    addDoctor,
    editDoctor,
    deleteDoctor,
  };
});
