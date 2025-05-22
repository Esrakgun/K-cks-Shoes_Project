import type { FC } from "react";
import Form from "../../components/form";
import type { IShoeFormValues } from "../../types";
import { useShoe, useUpdateShoe } from "../../service/shoe";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";



const Edit:FC = () => {
    const {mutate,isPending:isUpdatePending} = useUpdateShoe();
    // !Düzenleme yapıcak ürünün id'si:
    const { id }=useParams();
    // !Düzenleme yapıcak ürünün bilgileri:
    const { data, isPending } = useShoe(id as string);
    
// Form Gönderildiğinde çalışacak (Api, isteği atıcak) fonksiyon:
    const onSubmit = (values: IShoeFormValues) => {
        console.log(values + "Güncellendi");
        mutate({ id, data:values });
    };

// Loading durumunda Loader göster:
 if (isPending) return <Loader/>;
        
  return (
    <div className="max-w-[1000px] mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Ürün Düzenle</h1>

        <Form onSubmit={onSubmit} data={data} isPending={isUpdatePending}/>
    </div>
  )
}

export default Edit;