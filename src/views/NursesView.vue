<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Список медсестр</h1>
    <Button variant="default" class="mb-4" @click="openAddDialog">Добавить медсестру</Button>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ФИО</TableHead>
          <TableHead>Отделение</TableHead>
          <TableHead class="text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="nurse in nurses" :key="nurse.id" class="hover:bg-muted">
          <TableCell>{{ nurse.name }}</TableCell>
          <TableCell>{{ nurse.department }}</TableCell>
          <TableCell class="flex justify-end">
            <Button variant="outline" size="sm" @click="openEditDialog(nurse)">Редактировать</Button>
            <Button variant="destructive" size="sm" class="ml-2" @click="deleteNurse(nurse.id)">Удалить</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Диалог -->
    <Dialog v-model:open="isDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ editingNurse ? 'Редактировать медсестру' : 'Добавить медсестру' }}</DialogTitle>
        </DialogHeader>
        <form @submit.prevent="saveNurse" class="space-y-4">
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useNursesStore } from '@/stores/nurses';

const store = useNursesStore();
const nurses = computed(() => store.nurses);

const isDialogOpen = ref(false);
const editingNurse = ref(null);
const form = ref({
  id: 0,
  name: '',
  department: 'Кардиологическое',
});

const openAddDialog = () => {
  editingNurse.value = null;
  form.value = { id: Date.now(), name: '', department: 'Кардиологическое' };
  isDialogOpen.value = true;
};

const openEditDialog = (nurse) => {
  editingNurse.value = nurse;
  form.value = { ...nurse };
  isDialogOpen.value = true;
};

const saveNurse = () => {
  if (editingNurse.value) {
    store.editNurse(form.value);
  } else {
    store.addNurse({ ...form.value });
  }
  closeDialog();
};

const deleteNurse = (id: number) => {
  store.deleteNurse(id);
};

const closeDialog = () => {
  isDialogOpen.value = false;
};
</script>
