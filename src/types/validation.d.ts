import { z } from "zod";
import * as validators from "@validators";

type SignUpInfo = z.infer<typeof validators.signupValidator>;
