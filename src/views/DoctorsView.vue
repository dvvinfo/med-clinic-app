<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Список врачей</h1>
    <Button variant="default" class="mb-4" @click="openAddDialog">Добавить врача</Button>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ФИО</TableHead>
          <TableHead>Отделение</TableHead>
          <TableHead>Заведующий</TableHead>
          <TableHead class="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="doctor in doctors" :key="doctor.id" class="hover:bg-muted">
          <TableCell>{{ doctor.name }}</TableCell>
          <TableCell>{{ doctor.department }}</TableCell>
          <TableCell>
            <!-- Корректное отображение Badge -->
            <Badge :variant="doctor.isHead ? 'success' : 'secondary'">
              {{ doctor.isHead ? 'Да' : 'Нет' }}
            </Badge>
          </TableCell>
          <TableCell class="flex justify-end">
            <Button variant="outline" size="sm" @click="openEditDialog(doctor)">Редактировать</Button>
            <Button variant="destructive" size="sm" class="ml-2" @click="deleteDoctor(doctor.id)">Удалить</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Диалог -->
    <Dialog v-model:open="isDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ editingDoctor ? 'Редактировать врача' : 'Добавить врача' }}</DialogTitle>
        </DialogHeader>
        <form @submit.prevent="saveDoctor" class="space-y-4">
          <div>
            <Label>ФИО</Label>
            <Input v-model="form.name" placeholder="Введите ФИО" required />
          </div>
          <div>
            <Label>Отделение</Label>
            <Select v-model="form.department">
              <SelectItem value="Кардиологическое">Кардиологическое</SelectItem>
              <SelectItem value="Хирургическое">Хирургическое</SelectItem>
            </Select>
          </div>
          <div class="flex items-center space-x-2">
            <Label>Заведующий</Label>
            <Checkbox v-model:checked="form.isHead"></Checkbox>
          </div>
          <DialogFooter>
            <Button variant="secondary" @click="closeDialog">Отмена</Button>
            <Button type="submit" class="ml-2">Сохранить</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useDoctorsStore } from '@/stores/doctors';

const store = useDoctorsStore();
const doctors = computed(() => store.doctors);

const isDialogOpen = ref(false);
const editingDoctor = ref(null);
const form = ref({
  id: 0,
  name: '',
  department: 'Кардиологическое',
  isHead: false,
});

const openAddDialog = () => {
  editingDoctor.value = null;
  form.value = { id: Date.now(), name: '', department: 'Кардиологическое', isHead: false };
  isDialogOpen.value = true;
};

const openEditDialog = (doctor) => {
  editingDoctor.value = doctor;
  form.value = { ...doctor };
  isDialogOpen.value = true;
};

const saveDoctor = () => {
  if (editingDoctor.value) {
    store.editDoctor(form.value);
  } else {
    store.addDoctor({ ...form.value });
  }
  closeDialog();
};

const deleteDoctor = (id: number) => {
  store.deleteDoctor(id);
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>
