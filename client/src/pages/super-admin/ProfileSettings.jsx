import { useState, useRef } from "react";
import { Camera, Check, Eye, EyeOff, Lock, Mail, Save, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProfileSettings() {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres du Profil</h1>
        <p className="text-gray-500 mt-1">Gérez votre profil de Super Admin sur la plateforme e-learning</p>
      </div>

      {/* ✅ Alerte supprimée ici */}

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Profile Card */}
        <div className="md:col-span-1">
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-t-lg">
              <CardTitle>Profil Super Admin</CardTitle>
              <CardDescription className="text-orange-100">Informations personnelles</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative mb-6 group">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={imagePreview || "/placeholder.svg"} alt="Avatar" className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white text-3xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 opacity-100 transition-opacity">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-10 w-10 rounded-full bg-orange-500 text-white hover:bg-orange-600 shadow-md"
                    onClick={triggerFileInput}
                  >
                    <Camera className="h-5 w-5" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-orange-500 font-medium">Super Administrateur</p>
              <p className="text-gray-500 text-sm mt-1">Plateforme ODC E-learning</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Tabs Section */}
        <div className="md:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="general">Informations Générales</TabsTrigger>
              <TabsTrigger value="password">Mot de Passe</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Informations Générales</CardTitle>
                  <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Form */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <CardTitle>Changer le Mot de Passe</CardTitle>
                  <CardDescription>Changez votre mot de passe régulièrement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Form Password */}
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
