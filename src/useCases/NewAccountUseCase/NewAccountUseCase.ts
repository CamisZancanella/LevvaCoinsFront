import { NewAccountService } from "../../services/NewAccountServices/NewAccountServices";

import {
  loadNewAccount,
  loadNewAccountDone,
  loadNewAccountFail,
} from "../../stores/NewAccountStore/NewAccountEvents";

import { router } from "../../Router";

import { NewAccountParams } from "../../domain/newAccount";
import { RequestError } from "../../domain/request";

const execute = async ({
  name,
  email,
  password,
  confirmPassword,
}: NewAccountParams): Promise<void> => {
  const errorCallback = ({ hasError, message }: RequestError) => {
    loadNewAccountFail({ hasError, message });
  };

  loadNewAccount();

  return NewAccountService.createUser({
    name,
    email,
    password,
    confirmPassword,
  })
    .then(() => {
      loadNewAccountDone();

      router.navigate("/login");
    })
    .catch(errorCallback);
};

const NewAccountUseCase = {
  execute,
};

export default NewAccountUseCase;