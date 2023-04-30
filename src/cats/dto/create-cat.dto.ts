import { IsInt, IsString } from "class-validator";
import * as z from "zod";

//SCHEMA É UMA ALTERNATIVA, NO CASO O ZOD ESTÁ SENDO USADO
export const createCatSchema = z.object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
})

export class CreateCatDto {
    @IsString()
    name: string;

    @IsInt()
    age: number;

    @IsString()
    breed: string;
}