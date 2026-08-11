export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return res.status(500).json({ message: 'GitHub configuration missing in backend.' });
  }

  const query = `
    query ($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GitHub GraphQL errors:', data.errors);
      return res.status(500).json({ message: 'Error fetching GitHub data', errors: data.errors });
    }

    const calendar = data.data.user.contributionsCollection.contributionCalendar;
    
    // Flatten weeks into a single array of days
    const days = calendar.weeks.flatMap(week => week.contributionDays);
    
    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let currentTempStreak = 0;

    const todayStr = new Date().toISOString().split('T')[0];
    let isCurrentStreakActive = false;
    let foundTodayOrYesterday = false;

    // Iterate backwards to compute the current streak accurately
    for (let i = days.length - 1; i >= 0; i--) {
      const day = days[i];
      if (day.date > todayStr) continue; // skip future days if any

      if (day.contributionCount > 0) {
        currentTempStreak++;
        if (!foundTodayOrYesterday) {
          isCurrentStreakActive = true;
          foundTodayOrYesterday = true;
        }
      } else {
        // If it's today and we have 0 contributions, we might still have a streak from yesterday.
        if (day.date === todayStr) {
          foundTodayOrYesterday = true; 
          continue;
        }
        
        // Break current streak calculation if a day in the past is 0
        break;
      }
    }
    
    currentStreak = currentTempStreak;

    // Calculate longest streak
    let tempStreak = 0;
    for (let i = 0; i < days.length; i++) {
      if (days[i].contributionCount > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    return res.status(200).json({
      totalContributions: calendar.totalContributions,
      currentStreak,
      longestStreak,
      contributionDays: days,
    });
  } catch (error) {
    console.error('GitHub API fetch error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
