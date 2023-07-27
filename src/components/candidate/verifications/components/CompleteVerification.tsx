import { Text, Box, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { featuresCardContent } from '../constants/FeaturesContent';
import { useVerificationContext } from '../context/VerificationContext';

type FeaturesCardPropsType = {
  id: string;
  cardBg: string;
  title: string;
  titleColor: string;
  text: string;
  textColor: string;
  illustrationSmall: string;
};

const FeaturesCard: React.FC<FeaturesCardPropsType> = ({
  cardBg,
  title,
  titleColor,
  text,
  textColor,
  illustrationSmall,
}): JSX.Element => {
  return (
    <Box className="featuresCard" sx={{ backgroundColor: cardBg }}>
      <Title className="card-title" sx={{ color: titleColor }} order={2}>
        {title}
      </Title>
      <Text className="card-text" sx={{ color: textColor }}>
        {text}
      </Text>

      <img src={illustrationSmall} alt="illustration" />
    </Box>
  );
};

export const CompleteVerification = () => {
  const { totalSteps, activeStep } = useVerificationContext();
  const navigate = useNavigate();

  if (activeStep !== totalSteps) {
    navigate('/');
    return <></>;
  }

  return (
    <main className="profile">
      <Box className="container complete-verification-container">
        <Box className="verification-feature-box">
          <Title className="title">Thanks for taking time and verifying</Title>
          <Text className="text">Your insights helps with keep Greenie updated and profiles verified</Text>
          <Text className="question-text">Greenie is a one stop platform for all verifications.</Text>

          <section id="verification-features">
            <Box className="featureGrid">
              {featuresCardContent.map((cardContent, id) => {
                return (
                  <FeaturesCard
                    key={cardContent.id}
                    id={`landingFeaturesIllustration${id}`}
                    cardBg={cardContent.cardBg}
                    title={cardContent.title}
                    titleColor={cardContent.titleColor}
                    text={cardContent.text}
                    textColor={cardContent.textColor}
                    illustrationSmall={cardContent.illustrationSmall}
                  />
                );
              })}
              <Box className="many-more">...and many more</Box>
            </Box>
          </section>
          <Text className="try-text">Give it a try</Text>
          <Link to={'/auth'}>
            <Text className="policy">Create an account</Text>
          </Link>
        </Box>
      </Box>
    </main>
  );
};
