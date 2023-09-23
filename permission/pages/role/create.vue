<template>
    <el-page-header @back="navigateTo('/role')">
        <template #title>Huỷ</template>
        <template #content><span class="text-large font-600 mr-3"> Thêm vai trò </span></template>
        <div class="mt-4 text-sm w-1/2">
            <Form class="space-y-6" @submit="submit" :validation-schema="schema" >
                <label for="name_role" class="block text-gray-700 text-xl">Tên vai trò</label>
                <div>
                    <Field name="name_role" id="name_role" type="text" class="text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"/>
                    <div style="height: 10px">
                        <ErrorMessage name="name_role" class="text-red-500"/>
                    </div>
                </div>
                <button type="submit" class="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Thêm</button>
            </Form>
        </div>
    </el-page-header>
</template>
<script lang="ts" setup>
    import * as yup from 'yup';
    import { ErrorMessage, Field, Form } from "vee-validate";
    const schema = yup.object({
        name_role: yup.string().required('Chưa nhập tên vai trò !')
    });
    const submit = (values :any) => {
        console.log(values);
    }
</script>