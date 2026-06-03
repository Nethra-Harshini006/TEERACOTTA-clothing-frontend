/** Resolve the email address that should receive transactional mail. */
export function getRecipientEmail(user, fallbackEmail = '') {
  const email = (user?.email || fallbackEmail || '').trim();
  return /\S+@\S+\.\S+/.test(email) ? email : null;
}

export function getUserDisplayName(user, fallbackName = '') {
  if (user?.firstName) {
    return [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  }
  return fallbackName?.trim() || 'Valued Customer';
}

export function getUserFormDefaults(user) {
  if (!user) {
    return { firstName: '', lastName: '', email: '', name: '', phone: '', city: '' };
  }
  return {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    name: [user.firstName, user.lastName].filter(Boolean).join(' ').trim(),
    phone: user.phone || '',
    city: user.city || '',
  };
}
