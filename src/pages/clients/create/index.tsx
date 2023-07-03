import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createClient } from 'apiSdk/clients';
import { Error } from 'components/error';
import { clientValidationSchema } from 'validationSchema/clients';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { FirmInterface } from 'interfaces/firm';
import { getFirms } from 'apiSdk/firms';
import { ClientInterface } from 'interfaces/client';

function ClientCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ClientInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createClient(values);
      resetForm();
      router.push('/clients');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ClientInterface>({
    initialValues: {
      name: '',
      contact_info: '',
      firm_id: (router.query.firm_id as string) ?? null,
    },
    validationSchema: clientValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Client
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="contact_info" mb="4" isInvalid={!!formik.errors?.contact_info}>
            <FormLabel>Contact Info</FormLabel>
            <Input type="text" name="contact_info" value={formik.values?.contact_info} onChange={formik.handleChange} />
            {formik.errors.contact_info && <FormErrorMessage>{formik.errors?.contact_info}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FirmInterface>
            formik={formik}
            name={'firm_id'}
            label={'Select Firm'}
            placeholder={'Select Firm'}
            fetcher={getFirms}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'client',
    operation: AccessOperationEnum.CREATE,
  }),
)(ClientCreatePage);
