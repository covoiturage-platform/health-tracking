import { CreateAdherentDto } from "./create-adherent.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateAdherentDto extends PartialType(CreateAdherentDto) {}
