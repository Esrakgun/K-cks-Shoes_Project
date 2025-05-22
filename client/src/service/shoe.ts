import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IShoe, IShoeFormValues } from "../types";
import api from "./axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const shoeService = {
    getAll: () => api.get<IShoe[]>("/shoes"),
    getById: (id: string) => api.get<IShoe>(`/shoes/${id}`),
    create: (data: IShoeFormValues) => api.post<IShoe>("/shoes", data),
    update: (id: string, data: Partial<IShoeFormValues>) =>
        api.put(`/shoes/${id}`, data),
    delete: (id: string) => api.delete(`/shoes/${id}`),
};

// Mutation ve sorgu Query Alanı:

const useShoes = () =>
    useQuery({
        queryKey: ["shoes"],
        queryFn: () => shoeService.getAll(),
        select: (data) => data.data,
    });

const useShoe = (id: string) =>
    useQuery({
        queryKey: ["shoes", id],
        queryFn: () => shoeService.getById(id),
        select: (data) => data.data,
    });

const useCreateShoe = () => {
    const client = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["update"],
        mutationFn: (data: IShoeFormValues) => shoeService.create(data),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["shoes"] });
            navigate("/dashboard");
            toast.success("Ürün Başarıyla Oluşturuldu");
        },
        onError: (error: Error) => {
            console.log(error);
            toast.error("Bir Hata Oluştu");
        },
    });
};


const useUpdateShoe = () => {
    const client = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["update"],
        mutationFn: ({ id, data }: { id: string, data: Partial<IShoeFormValues> }) => shoeService.update(id, data),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["shoes"] });
           navigate("/dashboard");
            toast.success("Ürün Başarıyla Güncellendi");
        },
        onError: (error: Error) => {
            console.log(error);
            toast.error("Bir Hata Oluştu");
        },
    });
};


const useDeleteShoe = () => {
    const client = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["delete"],
        mutationFn: (id: string) => shoeService.delete(id),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["shoes"] });
           navigate("/dashboard");
            toast.success("Ürün Başarıyla Silindi");
        },
        onError: (error: Error) => {
            console.log(error);
            toast.error("Bir Hata Oluştu");
        },
    });
};



export { shoeService, useShoes, useShoe, useCreateShoe, useUpdateShoe, useDeleteShoe };














