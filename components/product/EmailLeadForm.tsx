import tw from 'twin.macro';
import axios from 'axios';

import { useFormik } from 'formik';
import React, { FC, useState } from 'react';
import { EmailConfirmationMessage } from '@components/email-confirmation-message';
import { SecondaryButton } from '@components/buttons';
import { useRouter } from 'next/router';

interface EmailLeadFormI {
  logoUrl?: string;
  data: any;
}

const EmailLeadForm: FC<EmailLeadFormI> = ({ data, logoUrl }) => {
  const { query } = useRouter();

  const [showMessage, setShowMessage] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const email = values.email;
      try {
        axios.post('/api/submitForm', { email });
        resetForm();
        setShowMessage(true);
      } catch (error) {
        console.error(`Err:${error}`);
        resetForm();
      }
    },
  });

  if (!data) return null;

  return (
    <section
      id={data.__typename}
      tw="flex px-5 content-center justify-center relative"
      css={[query.brand === 'bullstrap' && tw`bg-primary-200`]}
    >
      {showMessage && <EmailConfirmationMessage logoUrl={logoUrl} />}
      <div tw="flex-col pt-11 md:pt-24 pb-12 flex md:max-w-3xl">
        <span tw="text-textColor-primary text-xl font-bold leading-10 md:text-center md:text-5xl">
          {data.sectionTitle}
        </span>
        <span tw="text-textColor-primary font-light md:(text-center max-w-2xl mt-6)">
          {data.sectionTextBody}
        </span>
        <form
          tw="flex flex-col pt-8 pb-8 md:flex-row"
          onSubmit={formik.handleSubmit}
        >
          <input
            className="border-gray-300"
            id="email"
            name="email"
            placeholder={data.signupFormPlaceholder}
            tw="text-textColor-primary bg-transparent text-base py-3 mb-3 md:mb-0 text-center outline-none border-2 border-gray-300 placeholder:text-textColor-primary md:w-5/6 md:mr-5 md:text-left md:pl-7"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {query.brand === 'bullstrap' ? (
            <button
              css={[
                tw`px-5 py-3 text-xs font-bold text-primary-200 transition-all duration-300 ease-in-out outline-none bg-white md:text-sm md:py-3 md:px-0 hover:(bg-primary-300 rounded-lg)`,
                {
                  minWidth: 166,
                },
              ]}
            >
              {data.signupCallToAction}
            </button>
          ) : (
            <SecondaryButton type="submit">
              {data.signupCallToAction}
            </SecondaryButton>
          )}
        </form>
      </div>
    </section>
  );
};

export default EmailLeadForm;
