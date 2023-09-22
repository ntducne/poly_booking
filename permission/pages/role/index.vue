<template>
    <el-page-header @back="navigateTo('/')">
        <template #title >
            Trang chủ
        </template>
        <template #content>
            <span class="text-large font-600 mr-3"> Quản lý vai trò </span>
        </template>
        <div class="mt-4 text-sm font-bold">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column label="Vai trò" prop="name" />
                <el-table-column label="Quyền thuộc vai trò" prop="numberPermission" />
                <el-table-column align="right">
                    <template #default="scope">
                        <el-button @click="navigateTo('/role/assignPermission/'+scope.row.id)">Quyền</el-button>
                        <el-button type="primary" @click="handleEdit(scope.row)">Sửa</el-button>
                        <el-button type="danger" @click="handleDelete(scope.row)">Xoá</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <template #extra>
            <div class="flex items-center">
                <el-button @click="navigateTo('/role/create')" type="default">Thêm Role</el-button>
            </div>
        </template>
    </el-page-header>
</template>
  
<script lang="ts" setup>
    useHead({
        title: 'PolyBooking - Role',
    })
    interface Role {
        id: string
        name: string
        numberPermission: number|string
    }
    const handleEdit = (row: Role) => {
        console.log(row.id)
    }
    const handleDelete = (row: Role) => {
        console.log(row.id)
    }
    const tableData: Role[] = [
        {
            id: '18723519236',
            name: 'super-admin',
            numberPermission: 0,
        },
    ]
    const loading = ref(true)
</script>
  