<template>
    <client-only>
    <el-page-header @back="navigateTo('/role')">
        <template #title>Huỷ</template>
        <template #content><span class="text-large font-600 mr-3"> Quyền của vai trò </span></template>
        <div class="mt-4 text-sm w-full">
            <Form class="space-y-6" @submit="submit">
                <el-select-v2
                    v-model="permission"
                    filterable
                    :options="options"
                    placeholder="Please select"
                    style="width: 240px"
                    multiple
                />
                <button type="submit" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Thêm</button>

            </Form>
        </div>
    </el-page-header>
</client-only>
</template>
<script lang="ts" setup>
    import { Form } from "vee-validate";
    const permission = ref([])
    const submit = () => {
        console.log(permission.value);
    }
    const arrPermission = [
        {
            value: 'admin.category.index',
            label: 'Danh sách danh mục',
        },
        {
            value: 'admin.category.create',
            label: 'Thêm danh mục',
            selected : true
        },
        {
            value: 'admin.category.update',
            label: 'Cập nhật danh mục',
        },
        {
            value: 'admin.category.destroy',
            label: 'Xoá danh mục',
        },
        {
            value: 'admin.category.trash',
            label: 'Danh sách danh mục bị xoá',
        },
        {
            value: 'admin.category.restore',
            label: 'Khôi phục danh mục',
        },
        {
            value: 'admin.category.forceDelete',
            label: 'Xoá danh mục',
        },
    ]
    const options = computed(() => {
        return arrPermission.map((item) => {
            return {
                label: item.label,
                value: item.value,
                selected: item.selected
            }
        })
    })
    
</script>