<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @UniqueEntity(fields={"username"})
 * @UniqueEntity(fields={"email"})
 * 
 * @ApiResource(
 *     normalizationContext={"groups"={"user:read","ride:read","booking:read"}},
 *     denormalizationContext={"groups"={"user:write", "ride:write","booking:write"}},
 * collectionOperations = {
"post_authenticate_user" = {
                "method" = "POST",
                "path" = "/login",
                "route_name"="login",
                "openapi_context" = {
                    "requestBody" = {
                        "content" = {
                            "application/x-www-form-urlencoded" = {
                                "schema"  = {
                                    "type"       = "object",
                                    "properties" =
                                    {
                                        "email"    = {"type" = "string"},
                                        "password"    = {"type" = "password"},
                                    },
                                },
                            },
                        },
                    },
                },
            },
"post_signup_user" = {
                "method" = "POST",
                "path" = "/signup",
                "route_name"="signup",
                "openapi_context" = {
                    "requestBody" = {
                        "content" = {
                            "application/x-www-form-urlencoded" = {
                                "schema"  = {
                                    "type"       = "object",
                                    "properties" =
                                    {
                                        "email"    = {"type" = "string"},
                                        "password"    = {"type" = "password"},
                                        "name" = {"type" = "string"},
                                        "lastName"= {"type" = "string"},
                                        "phoneNumber"    = {"type" = "integer"},
                                        "gender"  = {"type" = "string"},
                                        "username"    = {"type" = "string"},

                                    },
                                },
                            },
                        },
                    },
                },
            },
"patch_edit_profile" = {
                "method" = "PATCH",
                "path" = "/api/edit_profile",
                "route_name"="edit_profile",
                "openapi_context" = {
                    "requestBody" = {
                        "content" = {
                            "application/x-www-form-urlencoded" = {
                                "schema"  = {
                                    "type"       = "object",
                                    "properties" =
                                    {
                                        "id" = {"type" = "integer"},
                                        "name" = {"type" = "string"},
                                        "lastName"= {"type" = "string"},
                                        "phoneNumber"    = {"type" = "integer"},
                                        
       
                                    },
                                },
                            },
                        },
                    },
                },
            },
}
 * )
 * 
 *  @ORM\Entity(repositoryClass=UserRepository::class)
 *  @ORM\HasLifecycleCallbacks()
 */
class User  implements UserInterface, PasswordAuthenticatedUserInterface

{
    
    
    
    
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"ride:read", "ride:write" , "booking:read", "booking:write"})
     */
    private $id;

   
    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"user:read","ride:read","booking:read","user:write"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=50)
     * @Groups({"user:read","ride:read" ,"booking:read", "user:write"})
     */
    private $lastName;
   /**
     * @Groups({ "user:write"})
     * @ORM\Column(type="string", length=50)
     */
    
    private $email;
    /**
     * @Groups({"user:read", "user:write"})
     * @ORM\Column(type="string", length=60)
     */
    private $gender;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"user:read", "user:write"})
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];        

    /**
     * @ORM\OneToMany(targetEntity=Review::class, mappedBy="user")   
     */
    private $reviews;

    /**
     * @ORM\OneToMany(targetEntity=Ride::class, mappedBy="user")
     */
    private $rides;
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:write"})
     */
    private $password;
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user:read", "user:write"})
     */
    private $username;

    /**
     * @ORM\OneToMany(targetEntity=Booking::class, mappedBy="user")
     */
    private $bookings;


    public function __construct()
    {
        $this->reviews = new ArrayCollection();
        $this->rides = new ArrayCollection();
        $this->bookings = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }       

    public function getGender(): ?string
    {
        return $this->gender;
    }

    public function setGender(string $gender): self
    {
        $this->gender = $gender;

        return $this;
    }

    public function getPhoneNumber(): ?int
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(int $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return Collection<int, Review>
     */
    public function getReviews(): Collection
    {
        return $this->reviews;
    }

    public function addReview(Review $review): self
    {
        if (!$this->reviews->contains($review)) {
            $this->reviews[] = $review;
            $review->setUser($this);
        }

        return $this;
    }

    public function removeReview(Review $review): self
    {
        if ($this->reviews->removeElement($review)) {
            // set the owning side to null (unless already changed)
            if ($review->getUser() === $this) {
                $review->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Ride>
     */
    public function getRides(): Collection
    {
        return $this->rides;
    }

    public function addRide(Ride $ride): self
    {
        if (!$this->rides->contains($ride)) {
            $this->rides[] = $ride;
            $ride->setUser($this);
        }

        return $this;
    }

    public function removeRide(Ride $ride): self
    {
        if ($this->rides->removeElement($ride)) {
            // set the owning side to null (unless already changed)
            if ($ride->getUser() === $this) {
                $ride->setUser(null);
            }
        }

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }
    

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Returning a salt is only needed if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Booking>
     */
    public function getBookings(): Collection
    {
        return $this->bookings;
    }

    public function addBooking(Booking $booking): self
    {
        if (!$this->bookings->contains($booking)) {
            $this->bookings[] = $booking;
            $booking->setUser($this);
        }

        return $this;
    }

    public function removeBooking(Booking $booking): self
    {
        if ($this->bookings->removeElement($booking)) {
            // set the owning side to null (unless already changed)
            if ($booking->getUser() === $this) {
                $booking->setUser(null);
            }
        }

        return $this;
    }

     
}
