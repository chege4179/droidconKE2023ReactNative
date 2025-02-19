import { useTheme } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import OrganizerCard from '../../../components/cards/OrganizerCard';
import OrganizersCard from '../../../components/cards/OrganizersCard';
import Space from '../../../components/common/Space';
import StyledText from '../../../components/common/StyledText';
import MainContainer from '../../../components/container/MainContainer';
import HeaderRight from '../../../components/headers/HeaderRight';
import { WIDE_BLURHASH } from '../../../config/constants';
import type { OrganizingTeamMember } from '../../../global';
import { getOrganizingTeam, usePrefetchedEventData } from '../../../services/api';

const About = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const { organizers } = usePrefetchedEventData();

  const { isLoading, data: organizingTeam } = useQuery({
    queryKey: ['organizingTeam'],
    queryFn: getOrganizingTeam,
  });

  const organizingIndividuals = organizingTeam?.data.filter((item: OrganizingTeamMember) => item.type === 'individual');

  return (
    <MainContainer preset="scroll">
      <Stack.Screen
        options={{
          headerRight: () => <HeaderRight />,
          animation: 'none',
        }}
      />
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/about.jpg')}
          placeholder={WIDE_BLURHASH}
          contentFit="contain"
        />

        <View style={styles.content}>
          <StyledText font="bold" size="xl" variant="primary">
            About
          </StyledText>

          <Space size={16} />

          <StyledText font="regular" size="md">
            Droidcon is a global conference focused on the engineering of Android applications. Droidcon provides a
            forum for developers to network with other developers, share techniques, announce apps and products, and to
            learn and teach.
          </StyledText>

          <Space size={8} />

          <StyledText font="regular" size="md">
            This two-day developer focused gathering will be held in Nairobi Kenya on November 8th to 10th 2023 and will
            be the largest of its kind in Africa.
          </StyledText>

          <Space size={8} />

          <StyledText font="regular" size="md">
            It will have workshops and codelabs focused on the building of Android applications and will give
            participants an excellent chance to learn about the local Android development ecosystem, opportunities and
            services as well as meet the engineers and companies who work on them.
          </StyledText>

          <Space size={30} />

          <StyledText font="bold" size="xl" variant="primary">
            Organizing Team
          </StyledText>

          <Space size={20} />
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.tertiary} />
        ) : (
          <View style={styles.listContainer}>
            <FlashList
              data={organizingIndividuals}
              numColumns={3}
              renderItem={({ item }) => (
                <OrganizerCard
                  name={item.name}
                  photo={item.photo}
                  tagline={item.tagline}
                  handlePress={() => router.push({ pathname: `/${item.name}`, params: { name: item.name } })}
                />
              )}
              keyExtractor={(item: OrganizingTeamMember, index: number) => index.toString()}
              estimatedItemSize={50}
            />
          </View>
        )}
      </View>

      {organizers && <OrganizersCard organizers={organizers} />}

      <Space size={16} />
    </MainContainer>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 225,
  },
  content: {
    padding: 16,
  },
  listContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
  },
});
