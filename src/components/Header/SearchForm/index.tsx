import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import SearchTransactionUseCase from "../../../useCases/SeachTransactionUseCase/SeachTransactionUseCase";

const formSchema = yup.object({

    search: yup.string()
})

type formData = yup.InferType<typeof formSchema>;

export function SearchForm(){

    const { register, handleSubmit } = useForm<formData>({

        resolver: yupResolver(formSchema)
    })

    const handleSearch = ({search}:formData) =>{
        SearchTransactionUseCase.execute(search?.trim())
    }
    return(
        <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
            <input {...register("search")} type="text" placeholder="Busque por transações"/>

            <button type="submit">
                <MagnifyingGlass size={20}/>
                Buscar
            </button>
        </SearchFormContainer>
    )
}