import { Title, Text, createStyles } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const TermsAndConditionsPage = () => {
  const { classes } = useStyles();
  return (
    <main className={classes.tosPrivacyPage}>
      <Title className={classes.heading}>
        Terms and Conditions -{' '}
        <span>
          <Link className={classes.link} to={'/'}>
            Greenie
          </Link>
          <MdVerified size={'22px'} color="#8cf078" />
        </span>
      </Title>
      <Text className={classes.paragraph}>
        By using this Website, you agree to these Terms. If you do not agree with these Terms, you
        must not use this Website.
      </Text>
      <Title className={classes.subheading}>Registration and Account</Title>
      <Text className={classes.paragraph}>
        To use certain features of this Website, you may need to create an account by providing your
        name, email address, and other personal information as required by the Company. You must
        ensure that the information you provide during registration is accurate and complete. You
        must also update your information if there are any changes. You are solely responsible for
        maintaining the confidentiality of your account information, including your password, and
        for any activity that occurs on your account. The Company reserves the right to suspend or
        terminate your account if you violate these Terms and Conditions.
      </Text>
      <Title className={classes.subheading}>Modifications to these Terms of Use</Title>
      <Text className={classes.paragraph}>
        We may modify these Terms of Service from time to time. In such cases, we will revise the
        Terms of Use on the Site and update the date. By using the Service or the Site after we make
        any changes, you acknowledge and consent that you accept the updated Terms of Use.
      </Text>
      <Title className={classes.subheading}>Eligibility</Title>
      <Text className={classes.paragraph}>
        The use of this Site is restricted to individuals who are at least eighteen (18) years of
        age or older. Any registration, usage or access to the Site by an individual under the age
        of eighteen (18) is considered unauthorized, unlicensed, and a violation of these Terms of
        Use. By accessing and using the Site or Service, you confirm and guarantee that you are at
        least 18 years of age and agree to comply with all the Terms of Use.
      </Text>
      <Title className={classes.subheading}>Not Legal Advice</Title>
      <Text className={classes.paragraph}>
        Content is not intended to and does not constitute legal advice and no attorney-client
        relationship is formed, nor is anything submitted to this Web Site treated as confidential.
        The accuracy, completeness, adequacy, or currency of the Content is not warranted or
        guaranteed. Your use of Content on this Web Site or materials linked from this Web Site is
        at your own risk.
      </Text>
      <Title className={classes.subheading}>Privacy Practices</Title>
      <Text className={classes.paragraph}>
        We understand the significance of safeguarding your personal data and have formulated a
        Privacy Policy to ensure its adequate protection. Apart from these Terms of Service, your
        use and visitation of the Site is subject to the Privacy Policy. By using the Site, you
        consent to the Company's utilization of your personal information in conformity with the
        terms and intentions stated in the Privacy Policy. The Company reserves the right to modify
        the Privacy Policy at any time, solely at its discretion.
      </Text>
      <Title className={classes.subheading}>Reservation of Rights</Title>
      <Text className={classes.paragraph}>
        The Site and its associated Content that can be accessed through the Site are the
        intellectual property and copyrighted works of the Company or a third-party provider. All
        the rights, titles, and interests in and to the Site and the Content that are not explicitly
        granted are reserved. The Content is furnished on an "as is" and "as available" basis, and
        the Company reserves the right to withdraw the permissions granted to you, along with your
        access to and use of the Content, at any point in time. Means of Accessing the Site and
        Content Security, Passwords- You undertake not to utilize or access the Site in a manner
        that may cause harm, disablement, overloading, or impairment of any Company accounts,
        computer systems, or networks. You also agree not to attempt to gain unlawful access to any
        section of the Site, as well as any Company accounts, computer systems, or networks.
      </Text>
      <Text className={classes.paragraph}>
        In the event that you are required to create an account to avail of any of our Services, you
        must complete the registration process by submitting current, comprehensive, and accurate
        information as specified on the relevant registration form. You may also be obligated to
        choose a password and a user name. Access to and usage of password-protected or secure areas
        of the Site are limited to authorized users only.
      </Text>
      <Text className={classes.paragraph}>
        You are not allowed to disclose your password(s), account information, or Site access to any
        third party. You are responsible for ensuring the security of your password(s) and account
        information and accountable for any and all activities that arise from your usage of your
        password(s) or account(s), or from your access to the Site. You agree to notify the Company
        promptly in the event of any unapproved use of your password(s) or account(s), or any
        unauthorized usage of your password(s) or account(s) that is not authorized by these Terms
        of Use.
      </Text>
      <Title className={classes.subheading}>Termination</Title>
      <Text className={classes.paragraph}>
        The Company reserves the right to terminate or restrict access to the Site, any portions of
        the Site, or the Content offered on or through the Site at any time in its sole discretion.
        You agree that the Company may cancel or limit your access to or use of the Site or any
        content at any time, in its sole discretion. If the Company, in its sole discretion, decides
        that you have infringed on a third party's copyrights, the Company may terminate or restrict
        your access to or use of the Site. You agree that the Company will not be liable to you or
        any other person for any termination or limitation of your access to or use of the Site or
        any Content, including any shared content.
      </Text>
      <Title className={classes.subheading}>Waiver and Severability</Title>
      <Text className={classes.paragraph}>
        The Company's failure to exercise or enforce any rights or provisions in these Terms of
        Service shall not be construed as a waiver of such right or provision. If any part or
        provision of these Terms of Use is found to be unenforceable, that part or provision may be
        modified to make the Terms of Use legal and enforceable as modified. The remainder of the
        Terms of Use will remain unaffected.
      </Text>
      <Title className={classes.subheading}>Governing Law</Title>
      <Text className={classes.paragraph}>
        This is governed by all laws applicable within the territory of India. By using our
        Services, you are agreeing to this terms and conditions of the website thereby consenting to
        the exclusive jurisdiction and venue of courts in Pune, India, in all disputes arising out
        of the same.
      </Text>
      <Title className={classes.subheading}>Contact</Title>
      <Text className={classes.name}>Raunak Rane</Text>
      <Text className={classes.email}>ceo@greenie.one</Text>
    </main>
  );
};

const useStyles = createStyles((theme) => ({
  tosPrivacyPage: {
    width: '70%',
    maxWidth: '1440px',
    margin: '4rem auto',
  },
  link: {
    fontFamily: 'Gilroy-Bold !important',
    marginRight: '4px',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '0.6rem',
  },
  subheading: {
    fontSize: '1.5rem',
    marginBottom: '0.6rem',
  },
  paragraph: {
    fontSize: '14px',
    color: '#4c4c4c',
    marginBottom: '1rem',
  },
  name: {
    fontSize: '16px',
    fontWeight: 600,
  },
  email: {
    fontSize: '16px',
  },
}));
