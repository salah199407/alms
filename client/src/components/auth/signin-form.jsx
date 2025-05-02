import { useTranslation } from 'react-i18next';

function SignInForm() {
  const { t } = useTranslation();
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {t("Email")}
        </label>
        <Input
          type="email"
          name="userEmail"
          placeholder={t("Email")}
          // ... other props
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          {t("Mot de passe")}
        </label>
        <Input
          type="password"
          name="password"
          placeholder={t("Mot de passe")}
          // ... other props
        />
      </div>

      <Button type="submit">
        {isSubmitting ? t("Chargement") : t("signin")}
      </Button>
    </form>
  );
} 