import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Star, MapPin } from "lucide-react";

interface SkillCardProps {
  teacherName: string;
  skill: string;
  description?: string;
  rating: number;
  points: number;
  hostel: string;
  year: number;
  onConnect: () => void;
}

const SkillCard = ({ 
  teacherName, 
  skill, 
  description, 
  rating, 
  points, 
  hostel, 
  year, 
  onConnect 
}: SkillCardProps) => {
  return (
    <Card className="card-hover border-0 card-shadow bg-gradient-to-br from-card to-background">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-lg">{teacherName}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {hostel} • Year {year}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm">
              <Star className="w-4 h-4 fill-warning text-warning" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {points} pts
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-primary mb-2">{skill}</h3>
          {description && (
            <CardDescription className="text-sm leading-relaxed">
              {description}
            </CardDescription>
          )}
        </div>
        <Button 
          onClick={onConnect} 
          className="w-full group"
          size="sm"
        >
          Connect to Learn
        </Button>
      </CardContent>
    </Card>
  );
};

export default SkillCard;