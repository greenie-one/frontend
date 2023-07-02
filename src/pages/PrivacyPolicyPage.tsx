import { Title, Text, createStyles } from '@mantine/core';
import { MdVerified } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage = () => {
  const { classes } = useStyles();
  return (
    <main className={classes.tosPrivacyPage}>
      <Title className={classes.heading}>
        Privacy Policy -{' '}
        <span>
          <Link className={classes.link} to={'/'}>
            Greenie
          </Link>
          <MdVerified size={'22px'} color="#8cf078" />
        </span>
      </Title>
      <Text className={classes.paragraph}>
        This Privacy Policy explains how Greenie.One ("the Website") collects, uses, shares and protects personal
        information of its users ("the Users”). Greenie.One adheres to the Indian Data Protection Law, which includes
        the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures
        and Sensitive Personal Data or Information) Rules, 2011, as well as any other relevant rules, circulars, and
        notifications that may be issued under this law. The Website is owned and operated by Greenie.One, registered in
        India. This Privacy Policy applies to all Users of the Website
      </Text>
      <Title className={classes.subheading}>Personal Information Collected by Greenie.One</Title>
      <Text className={classes.paragraph}>
        As an employee background verification website operating in India, we collect a variety of personal and
        non-personal information from our users. This information is obtained during the registration process, when
        users request background verification services, or when they interact with our website in any other way. The
        personal information we collect may include the user's name, email address, phone number, and other contact
        details, as well as their education and employment history, criminal history, and any other information
        necessary for background verification purposes.
      </Text>
      <Text className={classes.paragraph}>
        In addition to personal information, we also collect non-personal information such as the user's IP address,
        browser type, and access times. This information helps us improve our website and provide better services to our
        users. We may also collect sensitive personal data or information, which is given a greater level of protection
        under the Indian Data Protection Law. This may include biometric records and financial information
      </Text>
      <Text className={classes.paragraph}>
        However, please note that any information that is freely available or accessible in the public domain or
        furnished under the Right to Information Act, 2005 or any other law for the time being in force shall not be
        regarded as Sensitive Information.
      </Text>
      <Text className={classes.paragraph}>
        The personal information we collect and hold about an individual will depend on the background checks required
        by the client and the information provided to us by the individual. This may include name, age, date of birth,
        employment history, reference information, education, professional qualifications, residency, sanctions,
        immigration status, claims, judgments, insolvency, current and previous directorships, character, personal
        reputation, and any other checks or enquiries that the client deems necessary to verify information provided by
        an individual.
      </Text>
      <Text className={classes.paragraph}>
        We take privacy issues seriously and are committed to protecting the information our users provide to us. We
        respect the confidentiality of the personal and sensitive information provided by individuals and will collect
        and manage this information in accordance with the Indian Data Protection Law, data privacy principles, and our
        Privacy Policy.
      </Text>
      <Title className={classes.subheading}>How we use the information collected</Title>
      <Text className={classes.paragraph}>
        Greenie. One complies to the Information Technology Act when collecting and processing Personal Information for
        its intended purpose(s). We conduct verification checks on an individual's information, documentation, and
        responses for employment, investigative, or due diligence reports at the request of our client, according to
        their legal obligations and risk management policy. We may also prepare employment or investigative reports, as
        required by law, to determine a candidate's suitability for a position of employment. We may use the Personal
        Information to apply to other entities for verification of an individual's personal and other information and
        conduct public record searches
      </Text>
      <Text className={classes.paragraph}>
        The resulting report, outlining the investigation's findings, is provided to the Client via a secure means for
        consideration of an individual's suitability for employment, change in responsibility, or other relevant
        circumstances where an individual's background is significant. We do not use personal information for marketing
        or advertising purposes, but we may use it for anonymised statistical purposes. The information we collect is
        also used to enhance the quality of our website and services and to communicate with users regarding their
        requests, updates, and other relevant information
      </Text>
      <Title className={classes.subheading}>Disclosure of Information</Title>
      <Text className={classes.paragraph}>
        In order to provide our services and comply with legal requirements, Greenie.One may need to disclose personal
        information to third-party service providers. However, we do not sell or share personal information with
        third-party marketing companies. Disclosure of personal information to clients and third parties acting as
        agents may be necessary to complete a requested check, but will only be done for limited and specified purposes
        with prior permission from the provider of such information. Clients agree to this disclosure in their contracts
        for completion of checks.
      </Text>
      <Text className={classes.paragraph}>
        We may also disclose personal information to overseas recipients, such as when an individual lived, studied, or
        worked overseas, and we need to liaise with sources, employers, third-party references, or educational
        institutions. Disclosures of this kind may be made to any country in the world, depending upon the circumstances
        of the individual. Additionally, personal information may be disclosed to our related bodies corporate or agents
        located overseas for data storage, administrative, operational, and/or processing purposes in connection with
        the preparation of an employment or investigative report for the client
      </Text>
      <Text className={classes.paragraph}>
        Finally, where required by law, we may disclose personal information to external law enforcement bodies or
        regulatory authorities without the consent of the provider in order to comply with legal obligations.
      </Text>
      <Title className={classes.subheading}>Protection of Your Information</Title>
      <Text className={classes.paragraph}>
        We take the security of your personal information seriously and have implemented appropriate technical and
        organizational security measures to protect it. However, it is important to note that the internet may not be
        completely secure, and we cannot guarantee the security of information transmitted to and from our Service.
        While we will take reasonable steps to safeguard your personal information, the transmission of information
        through our Service is done at your own risk. We recommend accessing the Service only within a secure
        environment.
      </Text>
      <Title className={classes.subheading}>Changes to Privacy Policy</Title>
      <Text className={classes.paragraph}>
        We reserve the right to make changes to this privacy policy from time to time. Users will be notified of any
        significant changes to the policy via email or notification on the website. The updated version will be
        indicated by an updated “Last updated” date below and the updated version will be effective as soon as it is
        accessible. We encourage you to review this privacy policy frequently.
      </Text>
      <Title className={classes.subheading}>Governing Law</Title>
      <Text className={classes.paragraph}>
        This Policy is governed by all laws applicable within the territory of India. By using our Services, you are
        agreeing to the terms of the Policy thereby consenting to the exclusive jurisdiction and venue of courts in
        Pune, India, in all disputes arising out of or relating to the use of our services and under any issue with
        regards to privacy Policy
      </Text>
      <Title className={classes.subheading}>Complaints</Title>
      <Text className={classes.paragraph}>
        In case of any dissatisfaction in relation to the website, the complaints can be lodged and upon lodging a
        complaint You agree to provide complete support to the customer service team with such reasonable information as
        may be sought by them from You. The decision of the Company on the complaints shall be final and You agree to be
        bound by the same
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
